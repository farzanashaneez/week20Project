import React from 'react'
import { useSelector } from 'react-redux';
import {Outlet,Navigate}from 'react-router-dom'

const AdminPrivateRoute = () => {
    const {isLogged}=useSelector(s=>s.admin);
    return isLogged ? <Outlet/> : <Navigate to="admin/signin" />;
  
}

export default AdminPrivateRoute
