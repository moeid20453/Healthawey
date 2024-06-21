import { useState } from "react";
import "../../assets/reg.css";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditProfile() {
  const idUser = Cookies.get("id");
  const nameUser = Cookies.get("name");
  const ageUser = Cookies.get("age");
  const usernameUser = Cookies.get("username");
  const weightUser = Cookies.get("weight");
  const heightUser = Cookies.get("height");
  const activityUser = Cookies.get("activity");
  const genderUser = Cookies.get("gender");

  const [name, setName] = useState(nameUser);
  const [age, setAge] = useState(ageUser);
  const [username, setUsername] = useState(usernameUser);
  const [weight, setWeight] = useState(weightUser);
  const [height, setHeight] = useState(heightUser);
  const [activity, setActivity] = useState(activityUser);
  const [gender, setGender] = useState(genderUser);
  const [accept, setAccept] = useState(false);


  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    let flag = true;

    if (
      name === "" ||
      age === "" ||
      weight === "" ||
      height === "" ||
      activity === "" ||
      gender === ""
    ) {
      flag = false;
    }

    try {
      if (flag) {
        let userUpdate = {
          name: name,
          age: age,
          username: username,
          weight: weight,
          height: height,
          activity: activity,
          gender: gender,
        };


        const res = await axios.post(
          `http://localhost:4500/User/update${idUser}`,
          { user: userUpdate }
        );

        const updatedUser = res.data;

        if (res.status === 201) {
          Cookies.set("name", updatedUser.name);
          Cookies.set("age", updatedUser.age);
          Cookies.set("username", updatedUser.username);
          Cookies.set("email", updatedUser.email);
          Cookies.set("weight", updatedUser.weight);
          Cookies.set("height", updatedUser.height);
          Cookies.set("activity", updatedUser.activity);
          Cookies.set("gender", updatedUser.gender);
          window.location.pathname = "/home";
        }
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  }

  return (
    <div className="contanier">
      <div className="row h-100">
        <form className="form" onSubmit={submit}>
          <div className="custom-form2">
            <h1>Edit profile</h1>
            <div className="form-control">
              <input
                id="Name"
                type="text"
                placeholder="Name"
                defaultValue={nameUser}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-control">
              <label htmlFor="age">Age</label>
              <input
                id="Age"
                type="number"
                placeholder="Age"
                defaultValue={ageUser}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              {age === "" && accept && (
                <p className="error">must be enter your age</p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input
                id="Username"
                type="text"
                placeholder="username"
                defaultValue={usernameUser}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {username === "" && accept && (
                <p className="error">must be enter your username</p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="weight">Weight</label>
              <input
                id="Weight"
                type="number"
                placeholder="current weight kg"
                defaultValue={weightUser}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="height">Height</label>
              <input
                id="Height"
                type="number"
                placeholder="height cm"
                defaultValue={heightUser}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
              {height === "" && accept && (
                <p className="error">must be enter your height</p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="activity">Activity</label>
              <select
                id="Activity"
                defaultValue={activityUser}
                onChange={(e) => setActivity(e.target.value)}
                required
              >
                <option value="">Select your activity</option>
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
              {activity === "" && accept && (
                <p className="error">must choose your activity</p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                defaultValue={genderUser}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {gender === "" && accept && (
                <p className="error">must choose your gender</p>
              )}
            </div>

            <button className="btn2 btn-primary" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
