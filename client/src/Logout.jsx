import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout-related logic here (e.g., clearing auth token, session, etc.)
    // For example, you might use localStorage or sessionStorage to store the auth token,
    // so you should clear it on logout:
    localStorage.removeItem("authToken");

    // Redirect the user to the login page after logout
    navigate("/login");
  };

  return (
    <div>
      <h2>Logout Page</h2>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Logout;
