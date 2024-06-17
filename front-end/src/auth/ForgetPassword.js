import { useState } from "react";
import "../assets/reg.css";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSubmit from "../components/Loading/Loading";
export default function Login() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setLoading(true);
    if (email === "") {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        let res = await axios.post("http://localhost:4500/User/forgetOTP", {
          user: {
            email: email,
          },
        });
        setLoading(false);
        let user = res.data;
        if (res.status === 200) {
            window.localStorage.setItem("email", user.email);
            window.location.pathname = "/otp";
        }
      }
    } catch (err) {
      if (err.response.status === 409) {
        setErr("Email or Password not valid");
      } else {
        setErr("Internal server Err");
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
              <h1>Forget Password</h1>

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

              <button className="btn2 btn-primary" type="submit">
                Send Mail
              </button>
              {err !== "" && <span className="error">{err}</span>}
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
