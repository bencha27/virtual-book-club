import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

export default function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary data-bs-theme='dark' mb-3">
      <div className="container-lg">
        {/* <a className="navbar-brand" href="#">Navbar</a> */}
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <Link to="/" className="navbar-brand fw-bold fs-2">Virtual Book Club</Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {Auth.loggedIn() ? (
              <>
                <Link to="/me" className="nav-link fs-5 px-4">My Account</Link>
                <Link to="/create" className="nav-link fs-5 px-4">Create a Post</Link>
                <Link to="/posts" className="nav-link fs-5 px-4">View Posts</Link>
                <Link to="/" className="nav-link fs-5 px-4" onClick={logout}>Log Out</Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="nav-link fs-5 px-4">Sign Up</Link>
                <Link to="/login" className="nav-link fs-5 px-4">Log In</Link>
                <Link to="/posts" className="nav-link fs-5 px-4">View Posts</Link>
              </>
            )}

            {/* <a className="nav-link active" aria-current="page" href="#">Home</a>
            <a className="nav-link" href="#">Sign Up</a>
            <a className="nav-link" href="#">Create a Post</a>
            <a className="nav-link" href="#">View Posts</a> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
