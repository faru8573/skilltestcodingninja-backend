import mongoose from "mongoose";
import { Employee, PerformanceReview } from "./schema.js";

export class ReviewModel {
  static async addReview(reviewBy, reviewFor, feedback) {
    try {
      const newReview = new PerformanceReview({
        reviewFor,
        reviewBy: [{ employee: reviewBy, feedback }],
      });

      const employee = await Employee.findById(reviewFor);
      if (!employee) throw new Error("Employee not found");

      employee.performanceReviews.push(newReview);
      await employee.save();
      await newReview.save();
      return newReview;
    } catch (error) {
      console.log("error while creating review", error);
      throw new Error("Error creating review: " + error.message);
    }
  }

  static async updateReview(reviewId, reviewBy, feedback) {
    console.log("in modal updateReview", reviewId, reviewBy, feedback);
    try {
      const findReview = await PerformanceReview.findById(reviewId);

      if (!findReview) {
        throw new Error("review not found");
      }
      const toUpdateReview = findReview.reviewBy.find(
        (review) => review.employee.toString() == reviewBy
      );

      if (!toUpdateReview) {
        throw new Error("review not found");
      }

      toUpdateReview.feedback = feedback;
      await findReview.save();
      return findReview;
    } catch (error) {
      console.log("error while updating review", error);
      throw new Error("Error updating review: " + error.message);
    }
  }

  static async getAllReviews() {
    try {
      const reviews = await PerformanceReview.find();
      return reviews;
    } catch (error) {
      console.log("error while creating review", error);
      throw new Error("something went wrong");
    }
  }

  static async submitFeedback() {}
}
