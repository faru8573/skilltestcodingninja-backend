import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BACKEND_URL_EMPLOYEE = `${BACKEND_URL}/api/employee`;

const initialState = {
  employees: [],
};

export const getEmployeesThunk = createAsyncThunk("get/employees", async () => {
  try {
    const response = await axios.get(BACKEND_URL_EMPLOYEE);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to get all employee data");
    throw error;
  }
});

export const registerEmployeeThunk = createAsyncThunk(
  "register/employee",
  async (employeeData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_EMPLOYEE}/registration`,
        employeeData
      );
      toast.success("Registered successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to register");
      throw error;
    }
  }
);

export const loginEmployeeThunk = createAsyncThunk(
  "login/employee",
  async (employeeData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_EMPLOYEE}/login`,
        employeeData
      );
      if (response.status === 200) {
        toast.success("login successful");
      } else {
        toast.error("Login failed");
      }
      return response.data;
    } catch (error) {
      toast.error("An error occurred during authentication");
      console.error("Error during form submission:", error);
    }
  }
);

export const removeEmployeeThunk = createAsyncThunk(
  "remove/employee",
  async (empId) => {
    try {
      const response = await axios.delete(`${BACKEND_URL_EMPLOYEE}/${empId}`);
      toast.success("Deleted successfully!");
      return empId;
    } catch (error) {
      toast.error("Failed to delete");
      throw error;
    }
  }
);

export const updateEmployeeThunk = createAsyncThunk(
  "update/employee",
  async (employeeData) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL_EMPLOYEE}/${employeeData._id}`,
        employeeData
      );
      toast.success("Updated successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to update");
      throw error;
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesThunk.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(registerEmployeeThunk.fulfilled, (state, action) => {
        state.employees = [...state.employees, action.payload];
      })
      .addCase(removeEmployeeThunk.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload
        );
      })
      .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (emp) => emp._id === action.payload._id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      });
  },
});

export const employeeReducer = employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;
export const employeeSelector = (state) => state.employeeReducer;
