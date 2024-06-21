import { useState } from "react";
import "../assets/reg.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSubmit from "../components/Loading/Loading";
export default function OTP() {
      const [err, setErr] = useState("");
const [otp ,setOtp] = useState(new Array(4).fill(""))
    function handelchange(e,index) {
        if (isNaN(e.target.value)) return false
        setOtp([...otp.map((data, indx) => (indx === index ? e.target.value : data))])
         

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
}
    const OTPT = otp[0] + otp[1] + otp[2] + otp[3];
    const email = Cookies.get("email");

    const [loading, setLoading] = useState(false);
   const OTP =  otp.map((data, i) => {
       return (
         <input
           key={i}
           type="text"
           value={data}
           maxLength={1}
           onChange={(e) => handelchange(e, i)}
         />
       );
   });

  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setLoading(true);
    if (otp.nextSibling === "") {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        let res = await axios.post("http://localhost:4500/User/checkOTP", {
          user:{
          OTP: OTPT,
          email: email,
        }
        });
        setLoading(false);
        let user = res.data;
        if (res.status === 201) {
          Cookies.set("username", user.username);
          Cookies.set("id", user.id);

          window.location.pathname = "/newpassword";
        }
      }
    } catch (err) {
      if (err.response.status === 400) {
        setErr("Error OTP");
      } else {
        setErr("Error OTP");
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
              <div className="otp-area">{OTP}</div>
              <button className="btn2 btn-primary" type="submit">
                Send OTP
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
