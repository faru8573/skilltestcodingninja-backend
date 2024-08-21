import React, { useState } from "react";
import "./sidebar.css";
import { useValue } from "../../context/AppContext";
function Sidebar() {
  const { habitData, createHabit, removeHabit, setHabitData } = useValue();
  const [habitName, setHabitName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (habitName.trim() === "") return;
    const response = await createHabit(habitName);
    if (response) {
      setHabitData((prev) => [...prev, response]);
      console.log("habitData", habitData, "response", response);
    }
    setHabitName("");
  };

  const handleRemove = async (habitId) => {
    const response = await removeHabit(habitId);
    if (response) {
      setHabitData((prev) => [...prev, response]);
      console.log(habitData);
    }
  };

  return (
    <div className="sidebar-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter habit"
          autoFocus
          onChange={(e) => setHabitName(e.target.value)}
          value={habitName}
        />
        <button className="addBtn">Add</button>
      </form>

      <div className="habit-list-container">
        <h3>All Habits:</h3>
        <div className="habit-items">
          {habitData.map((habit, idx) => (
            <div className="habit" key={idx}>
              <p className="habit-text">{habit.habitName}</p>
              <p
                onClick={() => handleRemove(habit._id)}
                className="habit-remove"
              >
                -
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
