import React from "react";
import "./sidebar.css";
import { useValue } from "../../context/AppContext";
function Sidebar() {
  const { habitData } = useValue();

  return (
    <div className="sidebar-container">
      <form action="">
        <input type="text" placeholder="Enter habit" autoFocus />
        <button className="addBtn">Add</button>
      </form>

      <div className="habit-list-container">
        <h3>All Habits:</h3>
        <div className="habit-items">
          {habitData.map((habit) => (
            <div className="habit" key={habit.id}>
              <p className="habit-text">{habit.habitName}</p>
              <p className="habit-remove">-</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
