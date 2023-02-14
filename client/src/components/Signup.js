import React, { useState } from "react";
import { validateEmail, checkPassword } from "../utils/helpers";

export default function Signup() {
  // Declare state variables for form inputs
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle changes in input fields
  const handleInputChange = (event) => {
    // Get the value and name of the input which triggered the change
    const { target } = event;
    const inputName = target.name;
    const inputValue = target.value;

    // Based on the input type, set the state of either email, username, or password
    if (inputName === "email") {
      setEmail(inputValue);
    } else if (inputName === "username") {
      setUsername(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  // Function to handle form submission
  const handleFormSubmit = (event) => {
    // Preventing the default behavior of the form submit (page refresh)
    event.preventDefault();

    // If the "email" input is not valid OR there is no "username" input
    if (!validateEmail(email) || !username) {
      // Set the error message
      setErrorMessage("Email or username is invalid. Please try again.");
      // Exit out of this code block if something is wrong so that the user can correct it
      return;
    }

    // If the "password" input is not valid
    if (!checkPassword(password)) {
      // Set the error message
      setErrorMessage(
        "Password did not meet the requirements. Please try again."
      );
      return;
    }

    // Display an alert with a greeting
    alert("Welcome, ${userName}!");

    // If all the input values are valid, clear out the input fields after registration.
    setEmail("");
    setUsername("");
    setPassword("");

  };

  return (
    <div className="container-md">
      {/* Header */}
      <div className="row text-center">
        <h1>Sign up</h1>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <form className="col-md-6">
          {/* Email */}
          <div className="mb-3">
            <label for="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail"
              name="email" value={email} onChange={handleInputChange}/>
          </div>

          {/* Username */}
          <div className="mb-3">
            <label for="inputUsername" className="form-label">Username</label>
            <input type="text" className="form-control" id="inputUsername"
              name="username" value={username} onChange={handleInputChange}/>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"
              name="password" value={password} onChange={handleInputChange}
              aria-describedby="passwordHelpBlock"/>
            <div id="passwordHelpBlock" className="form-text">
              Your password must be at least 8 characters long, contain uppercase and lower letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>
            Submit</button>
        </form>

        {errorMessage && (
          <div className="row text-center my-3">
            <p className="error-text text-danger">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}