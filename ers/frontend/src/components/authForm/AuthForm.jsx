import React, { useEffect, useState } from "react";
import "./authForm.css";
import { useValue } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const {
    registrationUser,
    isSignUp,
    loginUser,
    setIsSignUp,
    isAuthenticated,
    userRole,
  } = useValue();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      registrationUser(formData);
    } else {
      loginUser({ email: formData.email, password: formData.password });
    }

    setFormData({
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="auth-form-container">
      <p>{isSignUp ? "Sign up" : "Sign in"}</p>
      <form id="auth-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            value={formData.username}
            autoFocus
          />
        )}
        <input
          onChange={(e) => handleInput(e)}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          value={formData.email}
        />
        <input
          onChange={(e) => handleInput(e)}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          value={formData.password}
        />
        {isSignUp && (
          <select
            value={formData.role}
            onChange={(e) => handleInput(e)}
            name="role"
            id="role"
            required
          >
            <option value="" disabled>
              --Select a role--
            </option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        )}

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
