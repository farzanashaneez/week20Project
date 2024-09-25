import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../portalComponenets/modal.jsx";
import { validateForm } from "../helperFunctions/helpers.js";
import { signInStart,signinFailure,signinSuccess } from "../redux/user/userSlice.js";
import {useDispatch, useSelector} from 'react-redux'
import OAuth from "../components/OAuth.jsx";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
const {loading,error}=useSelector(state=>state.user)
console.log(error) 
const [validationErrors, setValidationErrors] = useState({});
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData,"signin");
        
        if (Object.keys(validationErrors).length > 0) {
            setValidationErrors(validationErrors);
            return; 
        }

    try{
      dispatch(signInStart());
      setValidationErrors({})
      const res = await axios.post("/api/auth/signin", formData, {
      "Content-Type": "application/json",
    });
   
    dispatch(signinSuccess(res))
    navigate('/')
    }
    catch(err){
      dispatch(signinFailure(err))
      setIsModalOpen(true)



      console.log("error",err)
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
        disabled={loading}
          type="submit"
          className="bg-[#D86D25] text-white p-3 rounded-lg uppercase hover:opacity-75 hover:text-black"
        >
          {loading ? 'loading...':'Sign in'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-4 m-5">
        <p>Don't Have an account ?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <Modal 
                isOpen={isModalOpen} 
                onClose={() => { setIsModalOpen(false);setValidationErrors({})}} 
                message={error?.response?.data?.message || "Invalid Credential"} 
            />
                </div>
  );
};


export default Signin
