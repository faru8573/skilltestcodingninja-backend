import { ReviewModel } from "../model/review.model.js";

export class ReviewController {
  async addReview(req, res) {
    try {
      const { reviewBy, reviewFor, feedback } = req.body;
      console.log(reviewBy, reviewFor, feedback);
      const result = await ReviewModel.addReview(reviewBy, reviewFor, feedback);

      return res.status(201).send(result);
    } catch (error) {
      console.log("error while adding review", error);
      res.status(500).send("something went wrong");
    }
  }

  async updateReview(req, res) {
    try {
      const { reviewId, reviewBy, feedback } = req.body;
      console.log("updateReview controller", reviewId, reviewBy, feedback);
      const result = await ReviewModel.updateReview(
        reviewId,
        reviewBy,
        feedback
      );
      console.log("result", result);
      if (!result) {
        return res.status(404).send("error while updating review");
      }

      res.status(200).send(result);
    } catch (error) {
      console.log("error while updating review", error);
      res.status(500).send("something went wrong");
    }
  }

  async getAllReviews(req, res) {
    try {
      const reviews = await ReviewModel.getAllReviews();
      res.status(200).send(reviews);
    } catch (error) {
      console.log("error while getting reviews", error);
      res.status(500).send("something went wrong");
    }
  }

  // async submitFeedback(req, res) {
  //   try {
  //     const { reviewBy, recipientId, feedbackText } = req.body;
  //     const result = await ReviewModel.submitFeedback(
  //       reviewBy,
  //       recipientId,
  //       feedbackText
  //     );
  //     if (!result) {
  //       return res.status(400).send("something went wrong");
  //     }
  //     res.status(200).send(result);
  //   } catch (error) {
  //     console.log("error while getting reviews", error);
  //     res.status(500).send("something went wrong");
  //   }
  // }
}
