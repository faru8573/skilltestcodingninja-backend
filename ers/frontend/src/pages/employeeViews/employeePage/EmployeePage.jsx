import React, { useState } from "react";
import "./employeePage.css";
import { useValue } from "../../../context/AppContext";
import FeedbackCard from "../../../components/feedbackCard/FeedbackCard";

const EmployeePage = () => {
  const { allReviews, data } = useValue();
  console.log(allReviews);
  const requiringFeedback = allReviews.filter((review) =>
    review.reviewBy.some((rev) => rev.feedback.trim() === "")
  );

  // const reviewBy = data.map((emp) => emp.reviewBy[0].employee).find((id) => id);

  // .filter((rev) => console.log(typeof rev.feedback));
  // console.log(requiringFeedback);

  const reviewer = allReviews.find((rev) => rev.reviewFor);
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
          <ul>
            {allReviews.map((review, idx) => (
              <li key={idx}>
                <div>{review.reviewBy[0].feedback}</div>
                <div>{review.reviewBy[0].feedback}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
