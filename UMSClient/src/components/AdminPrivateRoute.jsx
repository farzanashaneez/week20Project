import React from 'react'
import { useSelector } from 'react-redux';
import {Outlet,Navigate}from 'react-router-dom'

const AdminPrivateRoute = () => {
    const {admin}=useSelector(s=>s.admin);
    console.log("in admin private route",admin)
    return true ? <Outlet/> : <Navigate to="admin/signin" />;
  
}

export default AdminPrivateRoute
