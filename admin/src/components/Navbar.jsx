import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const backendUrl = import.meta?.env?.VITE_ADMIN_URL;
  console.log('backendUrl', backendUrl);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };
  return (
    <div className="flex items-center justify-between bg-white px-4 sm:px-10 py-3 border-b">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer "
          src={assets.admin_logo}
        ></img>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={backendUrl ? () => window.open(backendUrl, "_blank") : null}
        className="border px-2.5 py-0.5 rounded-full border-primary text-gray-600 hover:bg-primary hover:text-white transition-all text-sm"
      >
        See User View
      </button>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full "
      >
        Logout
      </button>
    </div>
  );
};
export default Navbar;
