import React, { useState } from "react";
import "./feedbackCard.css";
import { useValue } from "../../context/AppContext";

const FeedbackCard = ({ reviewFor, reviewBy }) => {
  const { data } = useValue();

  const recipient = data.find((emp) => emp._id == reviewFor);

  const employee = reviewBy?.[0]?.employee;

  const reviewerEmail = employee
    ? data.find((emp) => emp._id == employee)?.email
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="feedback-card">
      <h4>Reviewer : {recipient && employee && <i>{reviewerEmail}</i>}</h4>
      <p>
        Recipient : <i>{recipient ? recipient.email : " "}</i>
      </p>
      <form onSubmit={handleSubmit} id="reviewForm">
        <textarea
          name="feedback"
          id="feedback"
          rows={5}
          placeholder="Write feedback..."
        ></textarea>
        <button type="submit" className="feedbackSubmit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackCard;
