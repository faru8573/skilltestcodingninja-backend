import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import { HabitController } from "./src/controller/habit.controller.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const habitController = new HabitController();

app.get("/", habitController.getHabits);

app.post("/", habitController.addHabit);

app.put("/", habitController.updateHabits);

app.delete("/", habitController.removeHabit);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  connectDB();
});
