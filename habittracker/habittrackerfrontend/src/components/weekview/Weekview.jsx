import React, { useRef, useState } from "react";
import "./weekview.css";
import { assets } from "../../assets/assets";
import { useValue } from "../../context/AppContext";

function Weekview() {
  const { weekDays, habitData, updateHabit } = useValue();

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

  const handleDoneClick = (habitId, dayName, status) => {
    // e.target.parentElement.children[0].classList.add("hideMe");

    updateHabit(habitId, dayName, status);
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
        {habitData.map((habit, idx) => (
          <div className="habitName-days" key={idx}>
            <p className="habitName">{habit.habitName}</p>
            <p>{currentDate}</p>
            <div className="dayNums" key={habit._id}>
              {habit.tracker.map((d, idx) => (
                <div
                  className="num"
                  key={idx}
                  onClick={(e) => handleDoneClick(habit._id, d.day, "done")}
                >
                  <p className="date">{idx + 1}</p>

                  {d.status == "done" && (
                    <img
                      className="done-btn"
                      src={assets.tick}
                      alt="done button"
                    />
                  )}
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
