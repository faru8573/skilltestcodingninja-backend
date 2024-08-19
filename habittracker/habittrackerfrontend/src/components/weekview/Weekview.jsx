import React from "react";
import "./weekview.css";
import { assets } from "../../assets/assets";

function Weekview() {
  const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const currentDate =
    new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }) +
    " " +
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // document.querySelector(".not-done-btn").addEventListener("click", (e) => {
  //   console.log("click kara mujhe");
  // });

  const handleNotDoneClick = (e) => {
    e.target.parentElement.classList.add("hideMe");
  };

  const handleDoneClick = (e) => {
    console.log("clicked");
    // doneRef.current.parentElement.classList.add("hideKordo");
  };

  return (
    <div className="weekViewContainer">
      <div className="days-holder">
        {weekDays.map((day, idx) => (
          <div key={idx} className="day-name">
            {day}
          </div>
        ))}
      </div>

      <div className="habit-name-day-container">
        <div className="habitName-days">
          <p className="habitName">Dinner at 9 pm</p>
          <p>{currentDate}</p>
          <div className="dayNums">
            {weekDays.map((_, idx) => (
              <div className="num" key={idx}>
                <p
                  onClick={(e) => handleNotDoneClick(e)}
                  className="not-done-btn"
                >
                  &times;
                </p>
                <p className="date">{idx}</p>

                <img
                  className="done-btn"
                  src={assets.tick}
                  alt="done button"
                  onClick={(e) => handleDoneClick(e)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weekview;
