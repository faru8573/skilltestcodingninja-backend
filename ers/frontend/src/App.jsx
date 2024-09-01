import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home";
import Admin from "./pages/admin/Admin";
import Employee from "./pages/employee/Employee";
import AddEmployeeForm from "./components/forms/AddEmployeeForm";
import ReviewCard from "./components/review-card/ReviewCard";
import AddFeedback from "./components/forms/AddFeedback";
import Profile from "./components/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { index: true, element: <Home /> },
      { path: "/admin", element: <Admin /> },
      { path: "/add", element: <AddEmployeeForm /> },
      { path: "/reviews", element: <ReviewCard /> },
      { path: "/employee", element: <Employee /> },
      { path: "/feedbacks", element: <AddFeedback /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
