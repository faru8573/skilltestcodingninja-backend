import { Habit } from "./habit.schema.js";

export class HabitModel {
  static async createHabit(habitName) {
    try {
      const newHabit = new Habit({
        habitName,
      });

      await newHabit.save();
      return newHabit;
    } catch (error) {
      console.log("error while creating new habit", error);
      throw new Error("something something went wrong");
    }
  }

  static async getAllHabits() {
    try {
      const habits = await Habit.find();
      return habits;
    } catch (error) {
      console.log("error while getting all habits", error);
      throw new Error("something something went wrong");
    }
  }

  static async getHabit(habitId) {
    try {
      const habit = await Habit.findById(habitId);
      if (!habit) {
        throw new Error("No habit found");
      }
      return habit;
    } catch (error) {
      console.log("error while getting all habits", error);
      throw new Error("something something went wrong");
    }
  }

  static async updateHabitStatus(habitId, weekDay, status) {
    try {
      const habit = await Habit.findById(habitId);

      if (!habit) {
        throw new Error("No habit found");
      }
      if (habit) {
        const day = habit.tracker.find(
          (item) =>
            item.day.toLowerCase().trim() === weekDay.toLowerCase().trim()
        );

        day.status = status;
        await habit.save();

        return habit;
      }
    } catch (error) {
      console.log("error while updating habit", error);
      throw new Error("something something went wrong");
    }
  }

  static async removeHabit(habitId) {
    try {
      const result = await Habit.findByIdAndDelete(habitId);
      return result;
    } catch (error) {
      console.log("error while deleting habit", error);
      throw new Error("something something went wrong");
    }
  }
}
