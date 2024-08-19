import React, { useState } from "react";
import "./home.css";
import Sidebar from "../components/sidebar/Sidebar";
import Card from "../components/card/Card";
import Weekview from "../components/weekview/Weekview";

function Home() {
  const [showWeekView, setShowWeekView] = useState(false);
  return (
    <div className="home-container">
      <h1>Habit tracker</h1>
      <main>
        <div className="left">
          <Sidebar />
        </div>
        <div className="right card-container">
          <div className="btn-groups">
            <h3>Detail view</h3>{" "}
            <button
              onClick={() => setShowWeekView((prev) => !prev)}
              className="weekViewBtn"
            >
              Week view
            </button>
          </div>
          {showWeekView ? (
            <Weekview />
          ) : (
            <>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
