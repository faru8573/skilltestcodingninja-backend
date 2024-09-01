import { configureStore } from "@reduxjs/toolkit";
import { employeeReducer } from "./reducers/employeeReducer";

const store = configureStore({
  reducer: { employeeReducer },
});

export { store };
