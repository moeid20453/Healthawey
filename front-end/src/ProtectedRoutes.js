import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
 const ProtectedRoutes= () => {
     const userget = Cookies.get("username");
     let user
     if (userget !== undefined) {
          user=true
     }
     else  user =null
    return user ? <Outlet/> : <Navigate to="/login" />
}
export default ProtectedRoutes