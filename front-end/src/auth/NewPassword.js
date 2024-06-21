import { useState } from "react";
import "../assets/reg.css";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSubmit from "../components/Loading/Loading";
import Cookies from "js-cookie";

export default function SignUp() {
  const idUser = Cookies.get("id");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
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

    if (passwordValidationMessage !== "" || cPassword !== password) {
      setErr(passwordValidationMessage || "Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      let res = await axios.post(`http://localhost:4500/User/update${idUser}`, {
        user: {
          password: password,
        },
      });
      setLoading(false);
      let user = res.data;
      if (res.status === 201) {
        Cookies.set("id", user._id);
        Cookies.set("name", user.name);
        Cookies.set("age", user.age);
        Cookies.set("username", user.username);
        Cookies.set("email", user.email);
        Cookies.set("weight", user.weight);
        Cookies.set("height", user.height);
        Cookies.set("activity", user.activity);
        Cookies.set("gender", user.gender);
        Cookies.set("role", user.role, { httpOnly: false, secure: true });
        window.location.pathname = "/home";
      }
    } catch (err) {
      setErr("Internal server error");
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
              <h1>New Password</h1>

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
                  placeholder="Confirm Password"
                  value={cPassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  required
                />
                <label htmlFor="cPassword">Confirm password</label>
              </div>

              <button className="btn2 btn-primary" type="submit">
                Confirm
              </button>
              {err !== "" && <span className="error">{err}</span>}
              {cPassword !== password && accept && (
                <span className="error">Passwords do not match</span>
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
