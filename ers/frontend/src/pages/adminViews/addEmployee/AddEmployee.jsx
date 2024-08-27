import React, { useState } from "react";
import "./addEmployee.css";
import { useValue } from "../../../context/AppContext";

const AddEmployee = () => {
  const { addEmployee } = useValue();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(formData);
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };
  return (
    <div className="add-emp">
      <div className="add-emp-title">Add Employee</div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
        />
        <input
          onChange={(e) => handleInput(e)}
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
        />
        <input
          onChange={(e) => handleInput(e)}
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
        />

        <select
          name="role"
          id="role"
          onChange={(e) => handleInput(e)}
          value={formData.role}
        >
          <option value="" disabled>
            --Please select the role--
          </option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        <button id="submitBtn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
