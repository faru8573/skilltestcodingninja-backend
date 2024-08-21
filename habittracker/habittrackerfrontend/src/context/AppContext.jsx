import { createContext, useContext, useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useValue() {
  const value = useContext(AppContext);
  return value;
}

const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
export const AppContext = createContext(null);

export function ContextProvider({ children }) {
  const [habitData, setHabitData] = useState([]);

  useEffect(() => {
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((data) => setHabitData(data))
      .catch((err) => console.log("Error fetching habits", err));
  }, []);

  const createHabit = (habitName) => {
    fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ habitName: habitName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHabitData((prev) => [...prev, data]);
      })
      .catch((err) => console.log("error while adding habit", err));
  };

  const removeHabit = (habitId) => {
    fetch(BACKEND_URL + "/" + habitId, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const filtered = habitData.filter((habit) => habit._id !== habitId);
        setHabitData(filtered);
      });
  };

  const updateHabit = (habitId, weekDay, status) => {
    fetch(BACKEND_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        habitId: habitId,
        weekDay: weekDay,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // const filteredHabit = habitData.filter(
        //   (habit) => habit._id !== habitId
        // );
        // setHabitData([...filteredHabit, data]);

        setHabitData((prev) =>
          prev.map((habit) =>
            habit._id === habitId ? { ...habit, tracker: data.tracker } : habit
          )
        );
      });
  };

  return (
    <AppContext.Provider
      value={{
        habitData,
        weekDays,
        createHabit,
        removeHabit,
        updateHabit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
