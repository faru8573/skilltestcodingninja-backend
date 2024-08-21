import { HabitModel } from "../model/habit.model.js";

export class HabitController {
  async getHabits(req, res) {
    try {
      const allHabits = await HabitModel.getAllHabits();
      return res.status(200).send(allHabits);
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  }

  async addHabit(req, res) {
    try {
      const { habitName } = req.body;
      console.log(habitName);
      const newHabit = await HabitModel.createHabit(habitName);
      res.status(201).send(newHabit);
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  }

  async updateHabits(req, res) {
    try {
      const { habitId, weekDay, status } = req.body;
      console.log("habitId, weekDay, status ", habitId, weekDay, status);
      const result = await HabitModel.updateHabitStatus(
        habitId,
        weekDay,
        status
      );
      if (!result) {
        return res.status(404).send("No habit found");
      }

      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  }

  async removeHabit(req, res) {
    try {
      const { id } = req.params;
      console.log(id, "habitId controller");
      const result = await HabitModel.removeHabit(id);
      if (!result) {
        return res.status(404).send("No habit found");
      }
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("something went wrong");
    }
  }
}
