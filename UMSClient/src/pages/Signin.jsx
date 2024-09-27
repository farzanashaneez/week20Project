import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../portalComponenets/modal.jsx";
import { validateForm } from "../helperFunctions/helpers.js";
import {
  signInStart,
  signinFailure,
  signinSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, error,currentUser } = useSelector((state) => state.user);
  
  const [validationErrors, setValidationErrors] = useState({});
  const [isForgetpassword, setIsForgetpassword] = useState(false);
  const emailref=useRef();
  const passref=useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser!==null) {
      navigate("/"); // Redirect to home page if user is logged in
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    console.log(e.target.id,e.target.value,)
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
      dispatch(signInStart());
      setValidationErrors({});
      const res = await axios.post("/api/auth/signin", formData, {
        "Content-Type": "application/json",
      });

      dispatch(signinSuccess(res));
      navigate("/");
    } catch (err) {
      dispatch(signinFailure(err));
      setIsModalOpen(true);

      console.log("error", err);
    }
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    const errors = {};
console.log(formData)
    if (!formData.femail) {
      errors.femail = "Email is required.";
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.femail)) {
      errors.femail = "Email is invalid.";
    }
    if (!formData.fpasswordone) {
      errors.fpasswordone = "password is required.";
    }
    if (!formData.fpasswordtwo) {
      errors.fpasswordtwo = "confirm password is required.";
    }
    if (formData.fpasswordone !== formData.fpasswordtwo) {
      errors.fpasswordtwo = "in correct password";
    }
    if (formData.fpasswordone?.length < 6 ) {
      errors.fpasswordone = "password must be at least 6 charecter long ";
  }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      setValidationErrors({});
      const res = await axios.post("/api/auth/changepassword", formData, {
        "Content-Type": "application/json",
      });
    
    setIsForgetpassword(false);
    emailref.current.value="";
    passref.current.value="";

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-10">Sign In</h1>
      {!isForgetpassword ? (
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
            disabled={loading}
            type="submit"
            className="bg-[#D86D25] text-white p-3 rounded-lg uppercase hover:opacity-75 hover:text-black"
          >
            {loading ? "loading..." : "Sign in"}
          </button>
          <OAuth />
        </form>
      ) : (
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitPasswordChange}
        >
          <input
          ref={emailref}
            type="email"
            placeholder="fEmail"
            id="femail"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          {validationErrors.femail && (
            <p className="text-red-500 text-sm">{validationErrors.femail}</p>
          )}
          <input
          ref={passref}
            type="password"
            placeholder="New Password"
            id="fpasswordone"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          {validationErrors.fpasswordone && (
            <p className="text-red-500 text-sm">
              {validationErrors.fpasswordone}
            </p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            id="fpasswordtwo"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          {validationErrors.fpasswordtwo && (
            <p className="text-red-500 text-sm">
              {validationErrors.fpasswordtwo}
            </p>
          )}
          <button
            disabled={loading}
            type="submit"
            className="bg-[#D86D25] text-white p-3 rounded-lg uppercase hover:opacity-75 hover:text-black"
          >
            Update
          </button>
        </form>
      )}

      <div className="flex gap-4 m-5 justify-between">
        <p>Don't Have an account ?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign up</span>
        </Link>

        {!isForgetpassword ? (
          <span
            onClick={() => {
              setIsForgetpassword(true);
            }}
            className="text-blue-500 cursor-pointer hover:opacity-75"
          >
            Forget password?
          </span>
        ) : (
          <span
            onClick={() => {
              setIsForgetpassword(false);
            }}
            className="text-blue-500 cursor-pointer hover:opacity-75"
          >
            go back{" "}
          </span>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setValidationErrors({});
        }}
        message={error?.response?.data?.message || "Invalid Credential"}
      />
    </div>
  );
};

export default Signin;
