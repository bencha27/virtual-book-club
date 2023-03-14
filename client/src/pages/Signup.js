import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/helpers";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function Signup() {
  // Declare state variables for form inputs
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const navigate = useNavigate();

  // Function to handle changes in input fields
  const handleInputChange = (event) => {
    // Get the value and name of the input which triggered the change
    const { name, value } = event.target;
    
    // Update input state variables
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    // Preventing the default behavior of the form submit (page refresh)
    event.preventDefault();

    // If the "email" input is not valid OR there is no "username" input
    if (!validateEmail(formState.email) || !formState.username) {
      // Set the error message
      setErrorMessage("Email or username is invalid. Please try again.");
      // Exit out of this code block if something is wrong so that the user can correct it
      return;
    }

    // If the "password" input is not valid
    if (!validatePassword(formState.password)) {
      // Set the error message
      setErrorMessage(
        "Password did not meet the requirements. Please try again."
      );
      return;
    }

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });
      Auth.login(data.createUser.token);
    } catch(err) {
      console.error(err);
    }

    // Display an alert with a greeting
    alert(`Welcome to the club, ${formState.username}!`);

    // If all the input values are valid, clear out the input fields after registration.
    setFormState({
      email: "",
      username: "",
      password: "",
    })

    // Render "/me"
    navigate("/me");
  };

  return (
    <div className="container-md">
      {/* Header */}
      <div className="row text-center">
        <h1>Sign Up</h1>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <form className="col-md-6" onSubmit={handleFormSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label for="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail"
              name="email" value={formState.email} onChange={handleInputChange}/>
          </div>

          {/* Username */}
          <div className="mb-3">
            <label for="inputUsername" className="form-label">Username</label>
            <input type="text" className="form-control" id="inputUsername"
              name="username" value={formState.username} onChange={handleInputChange}/>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
              name="password" value={formState.password} onChange={handleInputChange}
              aria-describedby="passwordHelpBlock"/>
            <div id="passwordHelpBlock" className="form-text">
              Your password must be at least 8 characters long, contain uppercase and lower letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Submit</button>
        </form>

        {errorMessage && (
          <div className="row text-center my-3">
            <p className="error-text text-danger">{errorMessage}</p>
          </div>
        )}

        {error && (
          <div className="row text-center my-3">
            <p className="error-text text-danger">Something went wrong...</p>
          </div>
        )}
      </div>
    </div>
  );
}