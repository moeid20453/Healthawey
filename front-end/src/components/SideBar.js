import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="sideBar">
            <Link className="item-link" to="users">Users</Link>
        </div>
    )
}