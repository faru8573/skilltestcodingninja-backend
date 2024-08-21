import React from "react";
import "./card.css";

function Card({ habitName, tracker }) {
  const calcTotalCompleted = tracker
    .map((day) => day.status)
    .filter((status) => status == "done").length;

  return (
    <div className="card">
      <p className="habitTitle">{habitName}</p>
      <p>Completed</p>
      <p>
        {calcTotalCompleted}/{tracker.length}
      </p>
    </div>
  );
}

export default Card;
