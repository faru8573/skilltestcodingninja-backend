import React, { useState } from "react";
import { useValue } from "../../../context/AppContext";
import ReviewCard from "../../../components/reviewCard/ReviewCard";
import "./reviews.css";
import AddReview from "../../../components/addReview/AddReview";

const Reviews = () => {
  const { allReviews } = useValue();

  const [showAddReview, setShowAddReview] = useState(true);

  return (
    <div className="reviews-container">
      <div className="add-review-container">
        <button
          className="add-review-btn"
          onClick={() => setShowAddReview((prev) => !prev)}
        >
          Add review
        </button>
        {showAddReview && <AddReview />}
      </div>

      <div className="reviews-cards-container">
        <p className="all-reviews-text">All Reviews</p>
        <div className="review-cards">
          {allReviews.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
