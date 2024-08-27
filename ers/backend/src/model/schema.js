import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  reviewBy: [
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
      feedback: {
        type: String,
        default: "",
        trim: true,
      },
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const PerformanceReview = mongoose.model("PerformanceReview", reviewSchema);

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "employee"],
    default: "employee",
  },
  performanceReviews: [
    { type: mongoose.Schema.Types.ObjectId, ref: "PerformanceReview" },
  ],
});

const Employee = mongoose.model("Employee", employeeSchema);

export { Employee, PerformanceReview };
