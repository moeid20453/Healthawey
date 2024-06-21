import { useState } from "react";
import "../assets/reg.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSubmit from "../components/Loading/Loading";

export default function SignUp() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [activity, setActivity] = useState("");
  const [gender, setGender] = useState("");
  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 20;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (password.length > maxLength) {
      return `Password must be no more than ${maxLength} characters long.`;
    }
    if (!regex.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (accept) {
      const validationMessage = validatePassword(newPassword);
      setErr(validationMessage);
    }
  };

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    setLoading(true);
    const passwordValidationMessage = validatePassword(password);

    if (
      name === "" ||
      email === "" ||
      passwordValidationMessage !== "" ||
      cPassword !== password ||
      age === "" ||
      weight === "" ||
      height === "" ||
      activity === "" ||
      gender === ""
    ) {
      setErr(
        passwordValidationMessage 
      );
      setLoading(false);
      return;
    }

    try {
      let res = await axios.post("http://localhost:4500/User/register", {
        user: {
          name: name,
          age: age,
          username: username,
          email: email,
          weight: weight,
          height: height,
          password: password,
          activity: activity,
          gender: gender,
        },
      });
      setLoading(false);
      let user = res.data.user.data;
      if (res.status === 201) {
        Cookies.set("name", user.name);
        Cookies.set("age", user.age);
        Cookies.set("username", user.username);
        Cookies.set("email", user.email);
        Cookies.set("weight", user.weight);
        Cookies.set("height", user.height);
        Cookies.set("activity", user.activity);
        Cookies.set("gender", user.gender);
        window.location.pathname = "/home";
      }
    } catch (err) {
      if (err.response.status === 409) {
        setErr("Email is already been taken");
      } else {
        setErr("Internal server Error");
      }
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row h-100">
          <form className="form" onSubmit={submit}>
            <div className="custom-form">
              <h1>Register Now</h1>
              <div className="form-control">
                <input
                  id="Name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="name">Name</label>
              </div>

              <div className="form-control">
                <input
                  id="Age"
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
                <label htmlFor="age">Age</label>
              </div>

              <div className="form-control">
                <input
                  id="Username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="username">Username</label>
              </div>

              <div className="form-control">
                <input
                  id="Email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">Email </label>
              </div>

              <div className="form-control">
                <input
                  id="Weight"
                  type="number"
                  placeholder="current weight kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <label htmlFor="weight">Weight</label>
              </div>

              <div className="form-control">
                <input
                  id="Height"
                  type="number"
                  placeholder="height cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
                <label htmlFor="height">Height</label>
              </div>

              <div className="form-control">
                <input
                  id="Pass"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="form-control">
                <input
                  id="Cpass"
                  type="password"
                  placeholder="confirm Password"
                  value={cPassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  required
                />
                <label htmlFor="cPassword">Confirm password</label>
              </div>

              <div className="form-control">
                <label htmlFor="activity">Activity </label>
                <select
                  id="Activity"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  required
                >
                  <option value="">select your activity</option>
                  <option value="Little to no exercise">
                    Little to no exercise
                  </option>
                  <option value="Light exercise or sports (1-3 days/week)">
                    Light exercise or sports (1-3 days/week)
                  </option>
                  <option value="Moderate exercise or sports (4-5 days/week)">
                    Moderate exercise or sports (4-5 days/week)
                  </option>
                  <option value="Hard exercise or sports (6-7 days/week)">
                    Hard exercise or sports (6-7 days/week)
                  </option>
                  <option value="Very hard exercise, physical job, or training twice a day">
                    Very hard exercise, physical job, or training twice a day
                  </option>
                </select>
              </div>
              <div className="form-control">
                <label htmlFor="gender">Gender </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <button className="btn2 btn-primary" type="submit">
                Sign up
              </button>
              {err && <span className="error">{err}</span>}
              {cPassword !== password && accept && (
                <span className="error">Passwords do not match</span>
              )}
              <p className="acc2">
                I already have an account{" "}
                <Link className="login" to="/login">
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
