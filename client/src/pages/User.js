import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import PostList from "../components/PostList";

export default function User() {
  const { userId } = useParams();

  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_ME,
    { variables: { userId: userId }}
  );

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user?.username) {
    return (
      <div className="container-md">
        <div className="row justify-content-center">
          <div className="col-10">
            <h4 className="text-center">
              You need to be logged in to see your page. Use the navigation links above to sign up or log in.
            </h4>
          </div>  
        </div>
      </div>
    );
  }

  return (
    <div className="container-md">
      <div className="row justify-content-center">
        <div className="col-10">
          <h2 className="text-center mb-4">My Account</h2>
          <h3 className="text-start offset-1">My posts</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={user.posts} />
          )}
        </div>
      </div>
    </div>

  );
}