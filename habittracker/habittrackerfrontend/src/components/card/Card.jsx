import React from "react";
import "./card.css";

function Card({ habitName, tracker }) {
  const calcTotalCompleted = tracker
    .map((day) => Object.values(day))
    .filter((value) => value == "done").length;

  return (
    <div className="card">
      <p>{habitName}</p>
      <p>Completed</p>
      <p>{calcTotalCompleted}/7</p>
    </div>
  );
}

export default Card;
