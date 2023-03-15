import React from 'react';
import { Link } from "react-router-dom";

export default function PostList({ posts }) {
  if (!posts.length) {
    return <h4 className="offset-1 text-muted">No posts</h4>;
  }

  return (
    <div>
      <div className="row justify-content-center">
        {posts && 
          posts.map((post) => (
            <div key={post._id} className="col-md-10">
              <div className="card mb-3" >
                <div className="card-header">
                  <h4 className="card-title">{post.postTitle}</h4>
                  <h5 className="card-subtitle text-muted">
                    By <Link to={`/user/${post.user._id}`}>{post.user.username}</Link>
                  <span style={{ float: "right" }}>
                      {`${new Date(Number.parseInt(post.createdAt)).toDateString()}`}
                  </span>
                  </h5>
                </div>
                <div className="card-body">
                  {post.postBody.length > 500 ? (
                    <p className="card-text">{`${post.postBody.substring(0, 500)}...`}</p>
                  ) : (
                    <p>{post.postBody}</p>
                  )}
                  <Link to={`/posts/${post._id}`}>View post</Link>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}