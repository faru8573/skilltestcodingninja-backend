import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./navbar.css";
import toast, { Toaster } from "react-hot-toast";
function Navbar() {
  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <header>
        <Link to="/">
          <h1 className="logo">
            ERS<span className="red-dot">.</span>
          </h1>
        </Link>

        <nav>
          <div className="nav-links">
            <ul>
              <li>
                <Link className="link" to={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="link" to={"/reviews"}>
                  Reviews
                </Link>
              </li>
              <li>
                <Link className="link" to={"/add"}>
                  Add employee
                </Link>
              </li>
              <li>
                <Link className="link" to={"/"}>
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="header-main-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
