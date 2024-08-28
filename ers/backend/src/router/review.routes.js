import express from "express";
import { ReviewController } from "../controller/review.controller.js";

const reviewRouter = express.Router();
const reviewController = new ReviewController();

reviewRouter.get("/", reviewController.getAllReviews);
reviewRouter.post("/", reviewController.addReview);
reviewRouter.put("/", reviewController.updateReview);

// reviewRouter.post("/feedback", reviewController.submitFeedback);

export { reviewRouter };
