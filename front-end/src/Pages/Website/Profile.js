import Header from "../../components/Header"
import '../../assets/Profile.css';
import { Link, Outlet } from "react-router-dom";

export default function Profile() {

  const usernameUser = localStorage.getItem('username');
    const activityUser = localStorage.getItem('activity');
    const genderUser = localStorage.getItem('gender');
  const emailUser = localStorage.getItem("email");
  const ageUser = localStorage.getItem("age");
     const heightUser = localStorage.getItem("height");
    const weightUser = localStorage.getItem("weight");
  const nameUser = localStorage.getItem("name");
  // const activityUser = localStorage.getItem("activity")
    
    function handelLogout() {
        window.localStorage.removeItem("email")
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("age");
        window.localStorage.removeItem("gender");
        window.localStorage.removeItem("activity");
        window.localStorage.removeItem("weight");
        window.localStorage.removeItem("height");
        window.localStorage.removeItem("username");
        window.location.pathname = '/login'
  }
  function edit() {
    window.location.pathname='/editprofile'
  }
    return (
      <div className="body8">
        <Header />
        <div className="form2">
          <div class="header__wrapper">
            <div class="cols__container">
              <div class="left__col">
                <h2>{nameUser}</h2>

                <ul class="about">
                  <li>
                    {" "}
                    Weight: <span>{weightUser}</span>
                  </li>
                  <li>
                    {" "}
                    Age:<span>{ageUser}</span>
                  </li>
                  <li>
                    {" "}
                    Height:<span>{heightUser}</span>
                  </li>
                  <li>
                    {" "}
                    username:<span>{usernameUser}</span>
                  </li>
                  <li>
                    {" "}
                    Email:<span>{emailUser}</span>
                  </li>
                  <li>
                    {" "}
                    gender:<span>{genderUser}</span>
                  </li>
                  <li>
                    {" "}
                    activity:<span>{activityUser}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="btn">
            <button className="btnLogout" onClick={edit}>
              Edit Profile
            </button>
            <button className="btnLogout" onClick={handelLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
}