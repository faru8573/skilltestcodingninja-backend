import React, { useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/commonViews/homePage/Home";
import AdminPage from "./pages/adminViews/adminPage/AdminPage";
import AddEmployee from "./pages/adminViews/addEmployee/AddEmployee";
import EmployeePage from "./pages/employeeViews/employeePage/EmployeePage";
import AssignedReview from "./pages/adminViews/assignReview/AssignedReview";
import Reviews from "./pages/adminViews/reviews/Reviews";
import AuthenticatePage from "./pages/commonViews/authPage/AuthenticatePage";
import { useValue } from "./context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useValue();
  if (isAuthenticated === null) {
    return <div>Loading....</div>;
  }
  return isAuthenticated ? children : Navigate("/auth");
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/auth", element: <AuthenticatePage /> },

        {
          path: "/admin",
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },

        {
          path: "/add",
          element: (
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          ),
        },
        {
          path: "/employee",
          element: (
            <ProtectedRoute>
              <EmployeePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/reviews",
          element: (
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          ),
        },
        {
          path: "/assign-review",
          element: (
            <ProtectedRoute>
              <AssignedReview />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
