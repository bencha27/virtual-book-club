import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function Login(props) {
  // Declare state variables for form inputs
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [login, { error, data }] = useMutation(LOGIN_USER);

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

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch(err) {
      console.error(err);
    }

    // Display an alert with a greeting
    alert(`Welcome back, ${formState.username}!`);

    // If all the input values are valid, clear out the input fields after registration.
    setFormState({
      username: "",
      password: "",
    })

    return <Navigate to="/me" />;
  };

  return (
    <div className="container-md">
      {/* Header */}
      <div className="row text-center">
        <h1>Log In</h1>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <form className="col-md-6" onSubmit={handleFormSubmit}>
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
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Submit</button>
        </form>

        {error && (
          <div className="row text-center my-3">
            <p className="error-text text-danger">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}