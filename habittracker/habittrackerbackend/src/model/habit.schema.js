import mongoose from "mongoose";
const trackerSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["done", "not done"], default: "not done" },
});

const habitSchema = new mongoose.Schema({
  habitName: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  tracker: {
    type: [trackerSchema],
    default: undefined,
  },
});

// Middleware to auto-populate the tracker with all days before saving
habitSchema.pre("save", function (next) {
  if (!this.tracker || this.tracker.length === 0) {
    this.tracker = [
      { day: "sun", status: "not done" },
      { day: "mon", status: "not done" },
      { day: "tue", status: "not done" },
      { day: "wed", status: "not done" },
      { day: "thu", status: "not done" },
      { day: "fri", status: "not done" },
      { day: "sat", status: "not done" },
    ];
  }
  next();
});

export const Habit = mongoose.model("Habit", habitSchema);
