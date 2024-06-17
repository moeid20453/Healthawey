import { Outlet, Navigate } from "react-router-dom";

const ProtectedAuth = () => {
  const usergetemail = localStorage.getItem("email");
  const usergetUsername = localStorage.getItem("username");
  let user;
  if (usergetemail !== null && usergetUsername === null) {
    user = true;
  } else user = null;
  return user ? <Outlet /> : <Navigate to="/home" />;
};
export default ProtectedAuth;
