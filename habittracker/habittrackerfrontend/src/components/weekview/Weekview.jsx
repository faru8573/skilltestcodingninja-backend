import React, { useRef, useState } from "react";
import "./weekview.css";
import { assets } from "../../assets/assets";
import { useValue } from "../../context/AppContext";

function Weekview() {
  const a = useValue();
  console.log(a);
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
    // console.dir(doneRef.current.classList);
    // doneRef.current.classList.add("hideKordo");
    console.dir(e.target.parentElement.children[2].classList.add("hideKordo"));
  };

  const handleDoneClick = (e) => {
    // console.dir(notDoneRef.current);
    // notDoneRef.current.classList.add("hideMe");
    console.dir(e.target.parentElement.children[0].classList.add("hideMe"));
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
        {habitData.map((habit, i) => (
          <div className="habitName-days" key={habit.id}>
            <p className="habitName">{habit.habitName}</p>
            <p>{currentDate}</p>
            <div className="dayNums" key={i}>
              {habit.tracker.map((d, idx) => (
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
        ))}
      </div>
    </div>
  );
}

export default Weekview;
