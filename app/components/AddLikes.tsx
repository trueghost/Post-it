"use client"

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AuthPosts } from "../types/AuthPosts";

type AddLikeProps = {
  id: string;
  likeId?: string;
  likedbyId?: string;
};

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts")
  return response.data
}

export default function AddLike({ id, likeId, likedbyId }: AddLikeProps) {

  const { data } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
})

  const userId = data?.id;

  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(likeId ? true : false);
  let toastLikeID: string;

  // console.log(likedbyId)

  // Create a post like mutation
  const { mutate } = useMutation(
    async (postId) => {
      await axios.post("/api/posts/addLike", { postId });
    },
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastLikeID });
        }
      },
      onSuccess: () => {
        setIsLiked((prev) => !prev);
        toast.success(isLiked ? "Post has been unliked! 😢" : "Post has been liked! 🔥", { id: toastLikeID });
        queryClient.invalidateQueries(["likeStatus", id]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["likeStatus", id]);
      },
    }
  );

  const handleLike = (e: any) => {
      e.preventDefault();
      mutate(id); // Send the post ID to the server
  };

  return (
    <button
      onClick={handleLike}
      className={`bg-transparent outline-none focus:outline-none`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={likeId && userId === likedbyId ? "red" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
