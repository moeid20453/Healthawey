import { Link } from "react-router-dom";
import "../assets/Dashboard.css"
export default function TopBar() {
    return (
        <div className="topBar">
            <Link className='logo'><img src={require("../img/logo.png")} alt=""/></Link>
            <Link className="button" to="/home">Go To Website</Link>
        </div>
    )
}