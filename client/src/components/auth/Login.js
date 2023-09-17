import useAuth from "../../hooks/useAuth";
import React, { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      if (response && response.token) {
        console.log("Logged in successfully!", response);
        // Redirect user to dashboard or home page
      } else {
        console.error("Login was unsuccessful.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <section className="sign-in">
      <h1>Sign In</h1>
      <br />
      <form onSubmit={handleLogin}>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          placeholder="Username"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button className="login-submit btn" type="submit">
          Submit
        </button>
      </form>
      <p className="login-text">
        Forgot <a className="login-link" href="#!">Password</a> or <a className="login-link" href="./sign-up.html">Sign up</a>
      </p>
    </section>
  );
};

export default Login;