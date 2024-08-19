import { createContext, useContext } from "react";

const habitData = [
  {
    id: 1,
    habitName: "Get up early",
    createdOn: "02/05/2023",
    tracker: [
      { sun: "done" },
      { mon: "not done" },
      { tue: "done" },
      { wed: "done" },
      { thu: "not done" },
      { fri: "done" },
      { sat: "done" },
    ],
  },
  {
    id: 2,
    habitName: "Reading books",
    createdOn: "03/12/2023",
    tracker: [
      { sun: "not done" },
      { mon: "done" },
      { tue: "done" },
      { wed: "not done" },
      { thu: "done" },
      { fri: "not done" },
      { sat: "done" },
    ],
  },
  {
    id: 3,
    habitName: "Exercise",
    createdOn: "01/15/2024",
    tracker: [
      { sun: "done" },
      { mon: "done" },
      { tue: "not done" },
      { wed: "done" },
      { thu: "done" },
      { fri: "done" },
      { sat: "not done" },
    ],
  },
  {
    id: 4,
    habitName: "Meditation",
    createdOn: "05/20/2024",
    tracker: [
      { sun: "not done" },
      { mon: "not done" },
      { tue: "done" },
      { wed: "not done" },
      { thu: "done" },
      { fri: "not done" },
      { sat: "done" },
    ],
  },
  {
    id: 5,
    habitName: "Drink water",
    createdOn: "06/10/2024",
    tracker: [
      { sun: "done" },
      { mon: "done" },
      { tue: "done" },
      { wed: "not done" },
      { thu: "done" },
      { fri: "done" },
      { sat: "done" },
    ],
  },
];

const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
export const AppContext = createContext(null);

export function useValue() {
  const value = useContext(AppContext);
  return value;
}

export function ContextProvider({ children }) {
  return (
    <AppContext.Provider value={{ habitData, weekDays }}>
      {children}
    </AppContext.Provider>
  );
}
