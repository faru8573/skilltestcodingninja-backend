import React, { useRef } from "react";
import { useValue } from "../../context/AppContext";
import "./addReview.css";

function AddReview() {
  const reviewByRef = useRef();
  const reviewForRef = useRef();
  const feedbackRef = useRef();

  const { data, createReview } = useValue();
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewBy = reviewByRef.current.value;
    const reviewFor = reviewForRef.current.value;
    const feedback = feedbackRef.current.value;
    if (
      reviewBy.trim().length == 0 ||
      reviewFor.trim().length == 0 ||
      feedback.trim().length < 1
    ) {
      return;
    }

    createReview({ reviewBy, reviewFor, feedback });

    console.log("Reviewer ID:", reviewBy);
    console.log("Review For:", reviewFor);
    console.log("Feedback:", feedback);
  };
  return (
    <div className="add-review-container">
      <form action="" id="addReviewForm" onSubmit={handleSubmit}>
        <input
          ref={reviewByRef}
          type="hidden"
          name="reviewBy"
          value={"66cc97056c57a6f80f33c72c"}
        />
        <label htmlFor="reviewFor">Review For</label>
        <select
          name="reviewFor"
          id="reviewFor"
          ref={reviewForRef}
          defaultValue={""}
        >
          <option value="" disabled>
            --Please Select--
          </option>
          {data.map((emp) => (
            <option key={emp._id} value={emp._id} className="userOptions">
              {emp.email}
            </option>
          ))}
        </select>

        <label htmlFor="feedback">Feedback</label>
        <textarea
          ref={feedbackRef}
          name="feedback"
          id="feedback"
          cols={50}
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddReview;
