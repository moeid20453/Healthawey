import NumOfUserWBB from "./weightBmrBmi";
import { Link } from "react-router-dom";
export default function header() {
  return (
    <div>
      <header>
        <Link className="logo">
          <img src={require("../img/logo.png")} alt="" />
        </Link>
        <NumOfUserWBB />
        <nav className="navbar">
        
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
