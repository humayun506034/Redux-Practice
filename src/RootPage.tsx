import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const RootPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        {/* Adjust paddingTop based on your navbar height */}
        <Outlet />
      </div>
    </div>
  );
};

export default RootPage;
