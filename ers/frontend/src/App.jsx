import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/commonViews/homePage/Home";
import AdminPage from "./pages/adminViews/adminPage/AdminPage";
import AddEmployee from "./pages/adminViews/addEmployee/AddEmployee";
import EmployeePage from "./pages/employeeViews/employeePage/EmployeePage";
import AssignedReview from "./pages/adminViews/assignReview/AssignedReview";
import Reviews from "./pages/adminViews/reviews/Reviews";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/admin", element: <AdminPage /> },
        { path: "/add", element: <AddEmployee /> },
        { path: "/employee", element: <EmployeePage /> },
        { path: "/reviews", element: <Reviews /> },
        { path: "/assign-review", element: <AssignedReview /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
