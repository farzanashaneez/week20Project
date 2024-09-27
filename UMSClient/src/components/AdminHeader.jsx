import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../redux/user/adminSlice";
import { useNavigate } from "react-router-dom";



function AdminHeader() {
  const {admin,isLogged}=useSelector(s=>s.admin);
  const navigate=useNavigate();
  console.log("--------->",admin,isLogged)
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(loggedOut());
    navigate('/admin/signin')
    
  };

  return (
    <nav className="flex justify-between items-center bg-[#2d6971]  p-4">
      <div className="flex items-center">
        <span className="text-white text-lg font-semibold uppercase">Admin</span>
      </div>
      {isLogged && <button 
        onClick={handleSignOut} 
        className="bg-[#D86D25] text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300"
      >
        Sign Out
      </button>}
    </nav>
  );
}

export default AdminHeader;