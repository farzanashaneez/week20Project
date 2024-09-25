import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Signin from "./Signin.jsx";
import axios from "axios";
import Modal from "../portalComponenets/modal.jsx";
import { validateForm } from "../helperFunctions/helpers.js";
import OAuth from "../components/OAuth.jsx";


const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const [validationErrors, setValidationErrors] = useState({});
const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    
  };
  console.log("form data", formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData,"signup");
        
        if (Object.keys(validationErrors).length > 0) {
            setValidationErrors(validationErrors);
            return; 
        }

    try{
      setLoading(true);
      setValidationErrors({})
      const res = await axios.post("/api/auth/signup", formData, {
      "Content-Type": "application/json",
    });
    setLoading(false);
    setError(false);
    navigate('/signin')
    } 
    catch(err){
      setLoading(false);
      setError(true);


      console.log("error",err)
    }
    
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-10">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
         {validationErrors.username && (
                        <p className="text-red-500 text-sm">{validationErrors.username}</p>
                    )}
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
          {loading ? 'loading...':'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-4 m-5">
        <p>Have an account ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <Modal 
                isOpen={error} 
                onClose={() => {setError(false); setValidationErrors({})}} 
                message={"something"} 
            />
                </div>
  );
};

export default Signup;
