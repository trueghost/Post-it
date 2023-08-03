export type PostType = {
    title: string;
    id: string;
    createdAt: string;
    user: {
      name: string;
      id: string;
      image: string;
    };
    hearts: {
      id: string;
      postId: string;
      userId: string;
    }[];
    Comment?: {
      createdAt: string;
      id: string;
      postId: string;
      userId: string;
    }[];
  };  