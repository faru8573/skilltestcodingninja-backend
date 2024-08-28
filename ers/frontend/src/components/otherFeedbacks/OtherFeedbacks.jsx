import React from "react";
import "./otherFeedbacks.css";
import { useValue } from "../../context/AppContext";

function OtherFeedbacks({ createdOn, reviewBy, reviewFor }) {
  const { data } = useValue();

  const reviewById = reviewBy?.[0].employee;

  const findReviewerEmail = data.find((emp) => emp._id == reviewById)?.email;

  const recipientEmail = data.find((emp) => emp._id == reviewById)?.email;

  return (
    <div className="content-list">
      <div className="reviewer">
        <p>Reviewer: {findReviewerEmail}</p>
        <p>CreatedOn: {createdOn?.slice(0, 10)}</p>
      </div>

      <div className="recipient">
        <p>To: {recipientEmail}</p>
        <p>nice done! good performance keep it up</p>
      </div>
    </div>
  );
}

export default OtherFeedbacks;
