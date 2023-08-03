'use client'

import axios from "axios"
import AddPost from './components/AddPost'
import { useQuery } from "@tanstack/react-query"
import Post from "./components/Post"
import { PostType } from "./types/Posts"

//Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts")
  return response.data
}

export default function Home() {

  const { data, error, isLoading } = useQuery<PostType[]>
  ({
    queryFn: allPosts,
    queryKey: ["posts"], //stores the posts in cache so it does not refetch's everytime the page is loaded
    })
    if(error) return error
    if(isLoading) return "Loading...."

  return (
    <main>
      <AddPost />
      { data?.map((post) => (
        <Post
          comments={post.Comment} 
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
          userId={post.user.id}
          likeId={post.hearts[0]?.id}
          likedbyId={post.hearts[0]?.userId}
        />
      )) }
    </main>
  )
}
