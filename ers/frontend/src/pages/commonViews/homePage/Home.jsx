import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <p className="title">Welcome to Employee Review System</p>
        <p className="desc">
          Empowering employees and managers to provide and receive constructive
          feedback. Choose your role to get started.
        </p>
        <div className="starter-btns">
          <Link className="btn" to={"/employee"}>
            I'm an Employee
          </Link>
          <Link className="btn" id="adminBtn" to={"/admin"}>
            I'm an Admin
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
