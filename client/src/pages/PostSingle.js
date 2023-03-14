import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";

export default function PostSingle() {
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId }
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container-md">
      <div className="row justify-content-center">
        <div key={post._id} className="col-md-8">
          <div className="card mb-3" >
            <div className="card-header">
              <h3 className="card-title">{post.postTitle}</h3>
              <h5 className="card-subtitle text-muted">
                By <Link to={`/user/${post.user._id}`}>{post.user.username}</Link>
                <span style={{ float: "right" }}>
                  {`${new Date(Number.parseInt(post.createdAt)).toDateString()}`}
                </span>
              </h5>
            </div>
            <div className="card-body">
              <p>{post.postBody}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}