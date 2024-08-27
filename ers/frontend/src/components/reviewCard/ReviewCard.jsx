import React, { useState } from "react";
import { useValue } from "../../context/AppContext";
import "./reviewCard.css";

function ReviewCard({ reviewBy, reviewFor, _id }) {
  const { data, updateReview } = useValue();

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const reviewerId = reviewBy?.[0].employee;
  const feedback = reviewBy?.[0].feedback;
  const findReviewer = data.find((emp) => emp._id == reviewerId);

  const reviewer = findReviewer?.email;

  const findRecipient = data.find((emp) => emp._id == reviewFor);
  const recipient = findRecipient?.email;

  const [formData, setFormData] = useState({
    reviewId: _id,
    reviewBy: reviewerId,
    feedback: feedback,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateReview(formData);
    setShowUpdateForm(false);
  };

  return (
    <div className="review-card">
      <div className="wrapper">
        <p>Review By :</p>
        <p>
          <i>{reviewer}</i>
        </p>
      </div>

      <div className="wrapper">
        <p>Review For :</p>
        <p>
          <i>{recipient}</i>
        </p>
      </div>

      <div className="wrapper" id="feedback">
        <p>Feedback :</p>

        {showUpdateForm ? (
          <form onSubmit={handleSubmit} id="reviewUpdateForm">
            <input
              type="hidden"
              name="reviewId"
              value={formData.reviewId}
              onChange={(e) => handleInput(e)}
            />

            <input
              type="hidden"
              name="reviewBy"
              defaultValue={formData.reviewBy}
              id="reviewBy"
              onChange={(e) => handleInput(e)}
            />

            <textarea
              onChange={(e) => handleInput(e)}
              name="feedback"
              value={formData.feedback}
              id="feedback"
            ></textarea>
            <button>Submit</button>
          </form>
        ) : (
          <p>
            <i>{feedback}</i>
          </p>
        )}
      </div>

      <button onClick={() => setShowUpdateForm((prev) => !prev)}>
        {showUpdateForm ? "Cancel" : "Update"}
      </button>
    </div>
  );
}

export default ReviewCard;
