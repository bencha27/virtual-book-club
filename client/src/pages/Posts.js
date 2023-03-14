import React from 'react';
import PostList from "../components/PostList";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

export default function Posts() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.allPosts || [];

  return (
    <div className="container-md">
      <div className="row justify-content-center">
        <div className="col-10">
          <h2 className="text-center mb-4">Recent Posts</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
}