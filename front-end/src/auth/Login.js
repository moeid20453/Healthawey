import { useState } from "react";
import "../assets/reg.css";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSubmit from "../components/Loading/Loading";
import Cookies from "js-cookie";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    let flag = true;
    e.preventDefault();
     setLoading(true);
    if (email === "" || password === "") {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        let res = await axios.post("http://localhost:4500/User/login", {
          user: {
            email: email,
            password: password,
          },
        });
        setLoading(false);
        let user = res.data;
        if (res.status === 200) {
         Cookies.set("id", user._id);
           Cookies.set("name", user.name);
           Cookies.set("age", user.age);
           Cookies.set("username", user.username);
           Cookies.set("email", user.email);
          Cookies.set("weight", user.weight);
           Cookies.set("height", user.height);
           Cookies.set("activity", user.activity);
          Cookies.set("gender", user.gender);
           Cookies.set("role", user.role ,{ httpOnly: false, secure: true });
          window.location.pathname = "/home";
        }
      }
    } catch (err) {
            if (err.response.status === 409) {
              setErr("Email or Password not valid")
            } else {
              setErr("Email or Password not valid");
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
            <div className="custom-form2">
              <h1>Sign In</h1>

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
                  id="Pass"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <Link className="forgetpassword" to="/forgetpassword">
                {" "}
                Forget Password ?
              </Link>
              <button className="btn2 btn-primary" type="submit">
                Sign In
              </button>
              {err !== "" && <span className="error">{err}</span>}
              <p className="acc2">
                I'm already have an account{" "}
                <Link className="login" to="/register">
                  {" "}
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
