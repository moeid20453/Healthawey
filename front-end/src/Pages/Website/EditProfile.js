import { useState } from "react";
import "../../assets/reg.css";
import axios from "axios";
// import img from "../../img/avatar1.avif"
export default function EditProfile() {
  const [image, setImage] = useState('')
function getLastSegment(image) {
  const segments = image.split("\\");
  return segments.pop(""); // returns the last segment
  }
  const lastsegment = getLastSegment(image) 
  const img =`../../img/${lastsegment}`
  const imgSrc = img
  console.log(image)
  // function handelApi() {
  //   const fromData = new fromData()
  //   formData.append('image',image)
  // }
//   function handelImage(e) {
// console.log(e.target.files)
//     setImage(e.target.files[0])
//   }
  const idUser = localStorage.getItem("id");
   const nameUser = localStorage.getItem("name");
   const ageUser = localStorage.getItem("age");
   const usernameUser = localStorage.getItem("username");
   const emailUser = localStorage.getItem("email");
   const weightUser = localStorage.getItem("weight");
   const heightUser = localStorage.getItem("height");
   const activityUser = localStorage.getItem("activity");
   const genderUser = localStorage.getItem("gender");
  const [name, setName] = useState(nameUser);
  const [age, setAge] = useState(ageUser);
  const [username, setUsername] = useState(usernameUser);
  const [email, setEmail] = useState(emailUser);
  const [weight, setWeight] = useState(weightUser);
  const [height, setHeight] = useState(heightUser);
  const [activity, setActivity] = useState(activityUser);
  const [gender, setGender] = useState(genderUser);
  const [accept, setAccept] = useState(false);
// console.log(idUser)
  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    if (
      name === "" ||
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
        let res = await axios.post(
          `http://localhost:4500/User/update${idUser}`,
          {
            user: {
              name: name,
              age: age,
              username: username,
              email: email,
              weight: weight,
              height: height,
              activity: activity,
              gender: gender,
            },
          }
        );
        let user = res.data;
         console.log(user)
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
      // console.log(err.response.status)
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
              <label htmlFor="gender">Activity </label>
              <select
                id="Activity"
                defaultValue={activityUser}
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
                <option value=" Moderate exercise or sports (4-5 days/week)">
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
                <p className="error">must be choose your activity</p>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="gender">Gender </label>
              <select
                id="gender"
                defaultValue={genderUser}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">selcet your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {gender === "" && accept && (
                <p className="error">must be choose your gender</p>
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
