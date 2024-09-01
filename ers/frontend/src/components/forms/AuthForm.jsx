import React, { useState } from "react";
import styles from "./authForm.module.css";
import { useDispatch } from "react-redux";
import {
  loginEmployeeThunk,
  registerEmployeeThunk,
} from "../../redux/reducers/employeeReducer";

function AuthForm() {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(registerEmployeeThunk(formData));
    } else {
      dispatch(
        loginEmployeeThunk({
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>{isSignUp ? "Sign up" : "Log in"}</h2>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {isSignUp && (
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              --Select Role--
            </option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        )}
        <button className={styles.submitBtn} type="submit">
          {isSignUp ? "Sign up" : "Log in"}
        </button>
      </form>
      <p className={styles.toggle} onClick={toggleAuthMode}>
        {isSignUp
          ? "Already have an account? Log in"
          : "Don't have an account? Sign up"}
      </p>
    </div>
  );
}

export default AuthForm;
