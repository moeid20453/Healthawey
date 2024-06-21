import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedAdmin = () => {
  const userget = Cookies.get("role");
  console.log(userget);
  let user;
  if (userget === "admin") {
    user = true;
  } else user = null;
  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedAdmin;
