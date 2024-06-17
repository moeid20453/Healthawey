import { useEffect, useState } from "react";
import "../../assets/reg2.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function UpdateUser() {
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
  const [emailError, setEmailError] = useState("");
  const id = window.location.pathname.split("/").slice(-1)[0]


      useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setName(data[0].name)
            setEmail(data[0].email);
          });
      }, []);

  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    if (
      name === "" ||
      email === "" ||
      password.length < 8 ||
      cPassword !== password
    ) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        let res = await axios.update(`http://127.0.0.1:8000/api/user/update/${id}`, {
          name: name,
          // Age: age,
          // Username: username,
          email: email,
          // Weight: weight,
          // Height: height,
          password: password,
          password_confirmation: cPassword,
          // activity: activity,
        });
        if (res.status === 200) {
          window.localStorage.setItem("email", email);
          window.location.pathname = "/home";
        }
      }
    } catch (err) {
      setEmailError(err.response.status);
    }
  }
  return (
    <div className="body">
      <form className="form" onSubmit={submit}>
        <div id="inputLable">
          <div id="reg">
            <div id="header">
              <pre>Sign Up</pre>
            </div>
            <div className="inputs">
              <div id="input">
                <label htmlFor="name">Name: </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {name === "" && accept && (
                  <p className="error">must be enter your name</p>
                )}
              </div>

              <div id="input">
                <label htmlFor="age">Age: </label>
                <input
                  id="age"
                  type="number"
                  placeholder="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {age === "" && accept && (
                  <p className="error">must be enter your age</p>
                )}
              </div>

              <div id="input">
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {username === "" && accept && (
                  <p className="error">must be enter your username</p>
                )}
              </div>

              <div id="input">
                <label htmlFor="email">Email: </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email === "" && accept && (
                  <p className="error">must be enter your email</p>
                )}
                {accept && emailError === 422 && (
                  <p className="error">Email is already been taken</p>
                )}
              </div>

              <div id="input">
                <label htmlFor="weight">Weight:</label>
                <input
                  id="weight"
                  type="number"
                  placeholder="current weight kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                {weight === "" && accept && (
                  <p className="error">must be enter your weight</p>
                )}
              </div>

              <div id="input">
                <label htmlFor="height">Height:</label>
                <input
                  id="height"
                  type="number"
                  placeholder="height cm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                {height === "" && accept && (
                  <p className="error">must be enter your height</p>
                )}
              </div>

              <div id="input">
                <label htmlFor="password">Password:</label>
                <input
                  id="pass"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length < 8 && accept && (
                  <p className="error">password must be more than 7 char </p>
                )}
              </div>

              <div id="input" className="cPassword">
                <label htmlFor="cPassword">Confirm password:</label>
                <input
                  id="cpass"
                  type="password"
                  placeholder="confirm Password"
                  value={cPassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
                {cPassword !== password && accept && (
                  <p className="error">password doesn't match</p>
                )}
              </div>

              <div id="input">
                <label htmlFor="gender">Activity: </label>
                <select
                  id="Activity"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                >
                  <option value="Sedentary">Little to no exercise</option>
                  <option value="Lightly Active">
                    Light exercise or sports (1-3 days/week)
                  </option>
                  <option value="Moderately Active">
                    Moderate exercise or sports (4-5 days/week)
                  </option>
                  <option value="Very Active">
                    Hard exercise or sports (6-7 days/week)
                  </option>
                  <option value="Super Active">
                    Very hard exercise, physical job, or training twice a day
                  </option>
                </select>
              </div>
              <div id="input">
                <label htmlFor="gender">Gender: </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div id="buttons">
            <button id="button" type="submit">
              Update
            </button>
            <p className="acc2">
              {" "}
              I'm already have an account{" "}
              <Link className="login" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
