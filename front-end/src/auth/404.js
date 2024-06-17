import { Link } from "react-router-dom";
import "../assets/404.css";
export default function Err404({role}) {
    return (
      <div className="body404">
        <div className="frem">
          <p>404 Not Found</p>
          <h2>Look like you're lost</h2>
          <h5>the page you are looking for not avaible!</h5>
          <Link to={"/home"}>Go to Home</Link>
        </div>
      </div>
    );
}