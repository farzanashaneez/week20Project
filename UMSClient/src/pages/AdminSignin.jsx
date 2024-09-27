import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../portalComponenets/modal.jsx";
import { validateForm } from "../helperFunctions/helpers.js";
import { loggedin, loginfailure, loggedOut } from "../redux/user/adminSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";

const AdminSignin = () => {
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { admin, isLogged } = useSelector((state) => state.admin);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      navigate("/admin/dashboard"); // Redirect to home page if user is logged in
    }
  }, [isLogged, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, "signin");

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    try {
      setValidationErrors({});
      const res = await axios.post("/api/admin/auth/signin", formData, {
        "Content-Type": "application/json",
      });

      dispatch(loggedin(res.data));
      navigate("/admin/dashboard");
    } catch (err) {
      dispatch(loginfailure(err));
      setIsModalOpen(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-10">Sign In</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {validationErrors.email && (
          <p className="text-red-500 text-sm">{validationErrors.email}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {validationErrors.password && (
          <p className="text-red-500 text-sm">{validationErrors.password}</p>
        )}
        <button
          type="submit"
          className="bg-[#D86D25] text-white p-3 rounded-lg uppercase hover:opacity-75 hover:text-black"
        >
          Sign In
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setValidationErrors({});
        }}
        message={"Some thing went wrong"}
      />
    </div>
  );
};

export default AdminSignin;
