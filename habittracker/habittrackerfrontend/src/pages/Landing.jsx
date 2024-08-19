import React from "react";
import "./landing.css";
function Landing({ setShowHome }) {
  return (
    <div className="landing-page">
      <div className="overlay"></div>
      <div className="main">
        <h1>Start building better habits today!</h1>
        <p className="quote">
          Track your progress, stay motivated, and achieve your goals one step
          at a time. Your journey to a better you begins here!
        </p>
        <button className="startBtn" onClick={() => setShowHome(true)}>
          Let's start
        </button>
      </div>
    </div>
  );
}

export default Landing;
