import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedAuth = () => {
  const usergetemail = Cookies.get("email");
  const usergetUsername = Cookies.get("username");
  let user;
  if (usergetemail !== undefined && usergetUsername === undefined) {
    user = true;
  } else user = null;
  return user ? <Outlet /> : <Navigate to="/home" />;
};
export default ProtectedAuth;
