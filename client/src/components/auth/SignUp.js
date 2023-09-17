import useAuth from "../../hooks/useAuth";
import React, { useState } from "react";

const SignUp = () => {
  const { signUp } = useAuth(); // Replace with the actual signUp function from your useAuth hook
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await signUp(credentials);
      if (response && response.token) {
        console.log("Signed up successfully!", response);
        // Redirect user to dashboard or home page
      } else {
        console.error("Sign-up was unsuccessful.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <section className="sign-in">
      <h1>Sign Up</h1>
      <br />
      <form onSubmit={handleSignUp}>
        <input
          className="input"
          type="text"
          id="username"
          name="username"
          placeholder="Create username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          placeholder="Create Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <input
          className="input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
        />
        <button className="login-submit btn" type="submit">
          Submit
        </button>
      </form>
      <p className="login-text">
        <a className="login-link" href="./sign-in.html">Sign In</a>
      </p>
    </section>
  );
};

export default SignUp;