import React, { useState } from 'react';
import { redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import Auth from "../utils/auth";

export default function PostForm() {
  const [formState, setFormState] = useState({
    postTitle: "",
    postBody: "",
  });

  const userId = Auth.getUser().data._id;

  const [createPost, { error, data }] = useMutation(CREATE_POST);

  const handleInputChange = (event) => {
    // Get the value and name of the input which triggered the change
    const { name, value } = event.target;
    
    // Update input state variables
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createPost({
        variables: { userId, ...formState },
      });
      setFormState({
        postTitle: "",
        postBody: "",
      });
      window.location.assign(`/me`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container-md">
      {/* Header */}
      <div className="row text-center">
        <h1>Create a post</h1>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <form className="col-md-6" onSubmit={handleFormSubmit}>
          {/* Book title */}
          <div className="mb-3">
            <label for="inputBookTitle" className="form-label">Post title</label>
            <input type="text" className="form-control" id="inputBookTitle" 
              name="postTitle" value={formState.postTitle} onChange={handleInputChange} />
          </div>

          {/* Book author */}
          {/* <div className="mb-3">
            <label for="inputBookAuthor" className="form-label">Book author</label>
            <input type="text" className="form-control" id="inputBookAuthor" 
              name="author" value={formState.author} onChange={handleInputChange} />
          </div> */}

          {/* Text */}
          <div className="mb-3">
            <label for="inputText" className="form-label">Post</label>
            <textarea className="form-control" id="inputText" rows="10" 
              name="postBody" value={formState.postBody} onChange={handleInputChange} ></textarea>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}