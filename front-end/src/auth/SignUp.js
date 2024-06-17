import { useState } from "react";
import "../assets/reg.css";
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
  const [err, setErr] = useState("")
  const [loading,setLoading] = useState(false)
  
  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    setLoading(true)
    if (
      name === "" ||
      email === "" ||
      password.length < 8 ||
      cPassword !== password ||
      age === "" ||
      weight === "" ||
      height === "" ||
      activity === "" ||
      gender === ""
    ) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
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
        setLoading(false)
        let user = res.data.user.data;
        if (res.status === 201) {
          window.localStorage.setItem("name", user.name);
          window.localStorage.setItem("age", user.age);
          window.localStorage.setItem("username", user.username);
          window.localStorage.setItem("email", user.email);
          window.localStorage.setItem("weight", user.weight);
          window.localStorage.setItem("height", user.height);
          window.localStorage.setItem("activity", user.activity);
          window.localStorage.setItem("gender", user.gender);
          window.location.pathname = "/home";
        }
      }
    } catch (err) {
      if (err.response.status === 409) {
        setErr("Email is already been taken")
      }
      else {
        setErr("Internal server Err")
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
                  minLength={7}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {/* {cPassword !== password && accept && (
                <p className="error">password doesn't match</p>
              )} */}
              </div>

              <div className="form-control">
                <label htmlFor="gender">Activity </label>
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
                  <option value="">selcet your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <button className="btn2 btn-primary" type="submit">
                sign up
              </button>
              {err !== "" && <span className="error">{err}</span>}
              {cPassword !== password && accept && (
                <span className="error">password doesn't match</span>
              )}
              <p className="acc2">
                I'm already have an account{" "}
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
