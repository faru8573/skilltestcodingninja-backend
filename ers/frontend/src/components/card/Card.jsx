import React, { useRef, useState } from "react";
import "./card.css";
import { assets } from "../../assets/assets";
import { useValue } from "../../context/AppContext";
import toast from "react-hot-toast";

const Card = ({
  _id,
  username,
  email,
  role,
  isEditing,
  setIsEditing,
  showAssign,
  setShowAssign,
}) => {
  const { updateEmployee, deleteEmployee, data, assignReview } = useValue();

  const [formData, setFormData] = useState({ username, email, role, _id });

  const reviewerRef = useRef();
  const reviewRecipientRef = useRef();

  const handleEditing = (id) => {
    setIsEditing(id);
  };

  const handleCancelEditing = () => {
    setIsEditing(null);
    setFormData({ username, email, role, _id }); //default value
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(formData);
    setIsEditing(null);
    toast.success("Updated successfully!");
  };

  const handleDelete = (empId) => {
    deleteEmployee(empId);
  };

  //////// review assign codes /////////

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    // console.log(reviewerRef, reviewRecipientRef);

    const reviewer = reviewerRef.current.value;
    const recipient = reviewRecipientRef.current.value;
    assignReview({ reviewBy: reviewer, reviewFor: recipient });
    setShowAssign(null);
    toast.success("Review assigned successfully");
  };

  return (
    <div className="card">
      {showAssign && (
        <div className="assign-container">
          <div className="form-container">
            <h3>Assign Review</h3>
            <form onSubmit={handleAssignSubmit}>
              <h4>
                Reviewer: <span className="reviewerName">{username}</span>
              </h4>
              <input
                ref={reviewerRef}
                type="hidden"
                name="reviewBy"
                value={_id}
              />
              <p>Recipient:</p>
              <select ref={reviewRecipientRef} name="recipient" id="">
                {data.map((emp) => (
                  <option key={emp.username} value={emp._id}>
                    {emp.email}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => setShowAssign(null)}>
                Cancel
              </button>
              <button type="submit">Assign</button>
            </form>
          </div>
        </div>
      )}
      <img src={assets.user} alt="user icon" className="user-icon" />
      {isEditing ? (
        <>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              onChange={(e) => handleInput(e)}
              type="text"
              name="username"
              value={formData.username}
            />
            <input
              onChange={(e) => handleInput(e)}
              type="text"
              name="email"
              value={formData.email}
            />
            <input
              onChange={(e) => handleInput(e)}
              type="hidden"
              name="empId"
              value={formData._id}
            />

            <select
              name="role"
              id=""
              onChange={(e) => handleInput(e)}
              value={formData.role}
            >
              <option value="" disabled>
                --select role--
              </option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            <button className="updateBtn" type="submit">
              update
            </button>
          </form>
          <button className="cancelBtn" onClick={handleCancelEditing}>
            cancel
          </button>
        </>
      ) : (
        <>
          <p className="name">Name: {username}</p>
          <p className="email">Email: {email}</p>
          <p className="role">Role: {role}</p>
          <div className="card-btns">
            <img
              onClick={() => handleDelete(_id)}
              src={assets.del}
              alt="del icon"
            />
            <img
              onClick={() => handleEditing(_id)}
              src={assets.pencil}
              alt="pen icon"
            />
          </div>
          <button
            onClick={() => setShowAssign(_id)}
            className="assign-review-btn"
          >
            Assign review
          </button>
        </>
      )}
    </div>
  );
};

export default Card;
