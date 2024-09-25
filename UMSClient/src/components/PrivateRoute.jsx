import React from 'react'
import { useSelector } from 'react-redux';
import {Outlet,Navigate}from 'react-router-dom'

const PrivateRoute = () => {
    const {currentUser}=useSelector(s=>s.user);
    console.log("in private route",currentUser)
    return currentUser ? <Outlet/> : <Navigate to="/signin" />;
  
}

export default PrivateRoute
