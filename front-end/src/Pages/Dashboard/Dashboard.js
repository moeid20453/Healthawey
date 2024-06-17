import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { Outlet } from "react-router-dom";
// import Users from "./Users";
export default function Dashboard() {
    return (
        <div className="body6">
            <TopBar />
            <div className="sidebarD">
                <SideBar />
                <div style={{ width: "78%", display:"block" }}>
                    <Outlet/>
                </div>
            </div>
    </div>
            )
}