import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-(--bg-main) text-(--text-main)">
        <Outlet />
      </div>
    </div>
  );
}

export default Root