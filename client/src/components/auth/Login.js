import useAuth from "../../hooks/useAuth";
import React, { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await login(credentials);
      if (response && response.token) {
        // Handle successful login here, e.g., redirecting the user, setting a user state, etc.
        console.log("Logged in successfully!", response);
        // For example, you might want to redirect the user to a dashboard or homepage.
      } else {
        // Handle any additional logic in case the login response does not contain a token.
        console.error("Login was unsuccessful.");
      }
    } catch (error) {
      // Handle errors like invalid credentials or network issues here.
      console.error("Error during login:", error);
    }
  };

  return (
	<div>
		<h1>Login</h1>
		<form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
		  <input
        type="email"
        placeholder="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
		  <input
        type="password"
        placeholder="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
		  <button type="submit">Login</button>
		</form>
	</div>
  );
};

export default Login;
