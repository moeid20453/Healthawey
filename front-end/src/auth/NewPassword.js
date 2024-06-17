import { useState } from "react";
import "../assets/reg.css";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSubmit from "../components/Loading/Loading";
export default function SignUp() {
  const idUser = localStorage.getItem("id");
  const email = localStorage.getItem("email")
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    setLoading(true);
    if (
      password.length < 8 ||
      cPassword !== password
    ) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        let res = await axios.post(
          `http://localhost:4500/User/update${idUser}`,
          {
            user: {
              password: password,
            }
},
        );
        setLoading(false);
        let user = res.data;
        console.log(user);
        // console.log(res.data)
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
        setErr("Internal server Err");
      }
      setLoading(false);
    }

    return (
      <>
        {loading && <LoadingSubmit />}
        <div className="container">
          <div className="row h-100">
            <form className="form" onSubmit={submit}>
              <div className="custom-form2">
                <h1>New Password</h1>

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

                <button className="btn2 btn-primary" type="submit">
                  Confirm
                </button>
                {err !== "" && <span className="error">{err}</span>}
                {cPassword !== password && accept && (
                  <span className="error">password doesn't match</span>
                )}
                <p className="acc2">
                  Back to{" "}
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
