import NumOfUserWBB from "./weightBmrBmi";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
export default function header() {
  const roleUser = Cookies.get("role")
  return (
    <div>
      <header>
        <Link className="logo">
          <img src={require("../img/logo.png")} alt="" />
        </Link>
        <NumOfUserWBB />
        <nav className="navbar">
          { roleUser==="admin" &&
            <Link className="nav" to="/dashboard/users">
              dashboard
            </Link>
          }
          <Link className="nav" to="/home">
            home
          </Link>
          <Link className="nav" to="/about">
            about
          </Link>
          <Link className="nav" to="/contact">
            contact
          </Link>
          <Link className="nav" to="/profile">
            My profile
          </Link>
        </nav>
      </header>
    </div>
  );
}
