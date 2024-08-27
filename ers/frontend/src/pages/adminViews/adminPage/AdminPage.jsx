import React, { useState } from "react";
import "./adminPage.css";
import Card from "../../../components/card/Card";
import AuthForm from "../../../components/authForm/authForm";
import { useValue } from "../../../context/AppContext";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { data } = useValue();
  const [isEditing, setIsEditing] = useState(null);
  const [showAssign, setShowAssign] = useState(null);

  return (
    <div className="adminpage-container">
      {isAuthenticated ? (
        <>
          {data.map((emp) => (
            <Card
              key={emp._id}
              {...emp}
              isEditing={isEditing == emp._id}
              setIsEditing={setIsEditing}
              showAssign={showAssign == emp._id}
              setShowAssign={setShowAssign}
            />
          ))}
        </>
      ) : (
        <>
          <AuthForm />
        </>
      )}
    </div>
  );
};

export default AdminPage;
