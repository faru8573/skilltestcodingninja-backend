import React, { useState } from "react";
import "./feedbackCard.css";
import { useValue } from "../../context/AppContext";

const FeedbackCard = ({ _id, reviewFor, reviewBy }) => {
  const { data, updateReview } = useValue();

  const recipient = data.find((emp) => emp._id == reviewFor);

  const employee = reviewBy?.[0]?.employee;

  const reviewerEmail = employee
    ? data.find((emp) => emp._id == employee)?.email
    : null;

  const [formData, setFormData] = useState({
    reviewId: _id,
    reviewBy: employee,
    feedback: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(formData);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReview(formData);
  };

  return (
    <div className="feedback-card">
      <h4>Reviewer : {recipient && employee && <i>{reviewerEmail}</i>}</h4>
      <p>
        Recipient : <i>{recipient ? recipient.email : " "}</i>
      </p>
      <form onSubmit={handleSubmit} id="reviewForm">
        <input
          type="hidden"
          name="reviewId"
          value={formData.reviewId}
          onChange={(e) => handleInput(e)}
        />
        <input
          type="hidden"
          name="reviewBy"
          value={formData.reviewBy}
          onChange={(e) => handleInput(e)}
        />
        <textarea
          onChange={(e) => handleInput(e)}
          name="feedback"
          id="feedback"
          rows={5}
          placeholder="Write feedback..."
          value={formData.feedback}
        ></textarea>
        <button type="submit" className="feedbackSubmit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackCard;
