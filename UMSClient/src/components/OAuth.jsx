import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { signinSuccess } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';


const OAuth = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const handleGoogleClick=async()=>{
        const provider=new GoogleAuthProvider();
        const auth=getAuth(app);
        try{
            const result=await signInWithPopup(auth,provider)
            console.log("google auth:",result)
            const res=await axios.post("/api/auth/google",{
                username:result.user.displayName,
                email:result.user.email,
                profilePicture:result.user.photoURL
            })
            console.log('google auth',res)
            dispatch(signinSuccess(res))
            navigate('/');

        }
        catch(err){
            console.log("login not possible",err)
        }
    }
  return (
   <button 
   onClick={handleGoogleClick}
   type='button' className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-80'>
    Continue With Google
   </button>
  )
}

export default OAuth
