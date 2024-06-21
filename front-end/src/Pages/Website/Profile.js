import React from "react";
import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../../components/Header";
import "../../assets/Profile.css";

export default function Profile() {
  const usernameUser = Cookies.get("username");
  const activityUser = Cookies.get("activity");
  const genderUser = Cookies.get("gender");
  const emailUser = Cookies.get("email");
  const ageUser = Cookies.get("age");
  const heightUser = Cookies.get("height");
  const weightUser = Cookies.get("weight");
  const nameUser = Cookies.get("name");

  function handleLogout() {
    Cookies.remove("email");
    Cookies.remove("name");
    Cookies.remove("age");
    Cookies.remove("gender");
    Cookies.remove("activity");
    Cookies.remove("weight");
    Cookies.remove("height");
    Cookies.remove("username");
    Cookies.remove("role");
    window.location.pathname = "/login";
  }

  function editProfile() {
    window.location.pathname = "/editprofile";
  }

  return (
    <div>
      <Header />
      <div className="profile-body">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-info">
              <h2>{nameUser}</h2>
              <ul className="profile-details">
                <li>
                  <span>Weight:</span> {weightUser} kg
                </li>
                <li>
                  <span>Age:</span> {ageUser}
                </li>
                <li>
                  <span>Height:</span> {heightUser} cm
                </li>
                <li>
                  <span>Username:</span> {usernameUser}
                </li>
                <li>
                  <span>Email:</span> {emailUser}
                </li>
                <li>
                  <span>Gender:</span> {genderUser}
                </li>
                <li>
                  <span>Activity:</span> {activityUser}
                </li>
              </ul>
              <div className="profile-buttons">
                <button className="edit-btn" onClick={editProfile}>
                  Edit Profile
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="profile-nav">
            <button className="profile-nav-btn">
              <Link to="savemeals">My Meals</Link>
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
