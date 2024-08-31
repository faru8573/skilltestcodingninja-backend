import express from "express";
import { ReviewController } from "../controller/review.controller.js";
import { isAuthenticated } from "../middlewares/middlewares.js";

const reviewRouter = express.Router();
const reviewController = new ReviewController();

reviewRouter.get("/", reviewController.getAllReviews);
reviewRouter.post("/", isAuthenticated, reviewController.addReview);
reviewRouter.put("/", isAuthenticated, reviewController.updateReview);

// reviewRouter.post("/feedback", reviewController.submitFeedback);

export { reviewRouter };
