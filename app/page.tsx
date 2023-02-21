"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreatePost from "./post/create_post";
import Post from "./post/post";
import { PostType } from "./types/post";

// Get posts
const getAllPosts = async () => {
  const response = await axios.get("/api/post/get_all_posts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: getAllPosts,
    queryKey: ["posts"],
  });

  if (error) {
    return <div>Error: {String(error)}</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <main>
      <CreatePost />
      {data?.map((post: PostType) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
        />
      ))}
    </main>
  );
}
