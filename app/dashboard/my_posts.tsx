"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/auth_posts";
import EditPost from "./edit_post";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/post/auth_posts");
  return response.data;
};

export default function MyPosts() {
  const { data, error, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["authPosts"],
  });

  if (error) {
    return <div>Error: {String(error)}</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {data?.posts?.map((post: any) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
