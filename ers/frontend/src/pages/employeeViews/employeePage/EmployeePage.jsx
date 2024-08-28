import React, { useState } from "react";
import "./employeePage.css";
import { useValue } from "../../../context/AppContext";
import FeedbackCard from "../../../components/feedbackCard/FeedbackCard";
import OtherFeedbacks from "../../../components/otherFeedbacks/OtherFeedbacks";

const EmployeePage = () => {
  const { allReviews } = useValue();

  const requiringFeedback = allReviews.filter((review) =>
    review.reviewBy.some((rev) => rev.feedback.trim() === "")
  );

  return (
    <div className="employee-page-container">
      <div className="employee-wrapper">
        <div className="required-feedback-container">
          <p id="title">All requiring feedbacks:</p>
          <div className="inner-card-container">
            {requiringFeedback.length > 0 ? (
              requiringFeedback.map((review, idx) => (
                <FeedbackCard key={idx} {...review} />
              ))
            ) : (
              <h2>No reviews requiring feedback</h2>
            )}
          </div>
        </div>

        <div className="existing-feedbacks">
          <p>Feedbacks by others: </p>
          <div className="feedbacks-container">
            {allReviews.map((review, idx) => (
              <OtherFeedbacks key={idx} {...review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
