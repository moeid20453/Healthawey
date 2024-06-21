import { Route, Routes } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import ForgetPassword from "./auth/ForgetPassword";
import NewPassword from "./auth/NewPassword";
import Home from "./Pages/Website/Home";
import BMI from "./Pages/Website/BMI";
import BMR from "./Pages/Website/BMR";
import Contact from "./Pages/Website/Contact";
import About from "./Pages/Website/About";
import Profile from "./Pages/Website/Profile";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users";
import EditProfile from "./Pages/Website/EditProfile";
import OTP from "./auth/OTP";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedOTP from "./ProtectedOTP";
import Err404 from "./auth/404";
import MakeMeals from "./Pages/Website/makeMeals";
import SavedMeals from "./Pages/Website/SavedMeals";
import Meals from "./Pages/Website/Meals";
import NutritionForm from "./Pages/Dashboard/addItem";
import ProtectedAdmin from "./ProtectedAdmin";
import PhotoUpload from "./Pages/Website/UploadPhoto";
export default function app() {
  return (
    <div>
      <Routes>
        <Route path="/photoupload" element={<PhotoUpload />}></Route>
        <Route path="/meals" element={<Meals />}></Route>
        <Route path="/makemeals" element={<MakeMeals />}></Route>
        <Route path="/*" element={<Err404 />}></Route>
        <Route element={<ProtectedOTP />}>
          <Route path="/otp" element={<OTP />}></Route>
        </Route>
        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/newpassword" element={<NewPassword />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/bmi" element={<BMI />}></Route>
          <Route path="/bmr" element={<BMR />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/profile" element={<Profile />}>
            <Route path="savemeals" element={<SavedMeals />} />
          </Route>
          <Route path="/editProfile" element={<EditProfile />}></Route>
          <Route element={<ProtectedAdmin />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />}></Route>
              <Route path="addItem" element={<NutritionForm />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
