import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((s) => s.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.data.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        />
        <input defaultValue={currentUser.data.username} type="text" id="username" placeholder="User Name" className="bg-slate-100 rounded-lg p-3 " />
        <input defaultValue={currentUser.data.email} type="email" id="email" placeholder="Email " className="bg-slate-100 rounded-lg p-3 " />
        <input  type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3 " />
<button className="bg-[#17383c] text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-50">Update</button>
      </form>
      <div className="flex justify-between mt-9">
        <span className="text-amber-900 ml-5">Delete Account</span>
        <span  className="text-amber-900 mr-8">Sign out</span>
        </div>
    </div>
  );
};

export default Profile;
