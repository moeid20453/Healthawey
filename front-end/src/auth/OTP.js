
import { useState } from "react";
import "../assets/reg.css";
// import axios from "axios";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSubmit from "../components/Loading/Loading";
export default function OTP() {
const [otp ,setOtp] = useState(new Array(4).fill(""))
    function handelchange(e,index) {
        if (isNaN(e.target.value)) return false
        setOtp([...otp.map((data, indx) => (indx === index ? e.target.value : data))])
         

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus()
        }
}
  
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
  const OTPT = otp[0] + otp[1] + otp[2] + otp[3];
  console.log(OTPT)
  const email = localStorage.getItem("email")
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
        let res = await axios.post("http://localhost:4500/User/checkOTP", {
          user:{
          OTP: OTPT,
          email: email,
        }
        });
        setLoading(false);
        let user = res.data;
        if (res.status === 201) {
          window.localStorage.setItem("username", user.username);
          window.location.pathname = "/newpassword";
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
              <div className="otp-area">{OTP}</div>
              <button className="btn2 btn-primary" type="submit">
                Send Mail
              </button>
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
