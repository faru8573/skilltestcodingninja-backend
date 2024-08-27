import React, { useState } from "react";
import "./authForm.css";

function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-form-container">
      <p>{isSignUp ? "Sign up" : "Sign in"}</p>
      <form id="auth-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
          />
        )}
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
        <select name="role" id="role" required>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <button type="submit" className="signUp-btn">
          {isSignUp ? "Sign up" : "Login"}
        </button>
      </form>

      <div className="toggle-btn">
        {isSignUp ? "Already registered?" : "New here?"}{" "}
        <span onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignUp ? "Login" : "Sign up"}
        </span>
      </div>
    </div>
  );
}

export default AuthForm;
