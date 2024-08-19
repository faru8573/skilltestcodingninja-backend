import React from "react";
import "./sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar-container">
      <form action="">
        <input type="text" placeholder="Enter habit" autoFocus />
        <button className="addBtn">Add</button>
      </form>

      <div className="habit-list-container">
        <h3>All Habits:</h3>
        <div className="habit-items">
          <div className="habit">
            <p className="habit-text">Reading books</p>
            <p className="habit-remove">-</p>
          </div>
          <div className="habit">
            <p className="habit-text">Reading books</p>
            <p className="habit-remove">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
