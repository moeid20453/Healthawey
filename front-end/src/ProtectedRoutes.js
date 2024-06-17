import { Outlet, Navigate } from "react-router-dom";

 const ProtectedRoutes= () => {
     const userget = localStorage.getItem("username")
     console.log(userget)
     let user
     if (userget !== null) {
          user=true
     }
     else  user =null
    return user ? <Outlet/> : <Navigate to="/login" />
}
export default ProtectedRoutes