import React from 'react'
import {Link} from 'react-router-dom'
import Signin from './Signin.jsx'


const Signup = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-10'>Sign Up</h1> 
    <form className="flex flex-col gap-4">
      <input type="text" placeholder='User Name' id="username" className='bg-slate-100 p-3 rounded-lg' />
      <input type="email" placeholder='Email' id="email" className='bg-slate-100 p-3 rounded-lg' />
      <input type="password" placeholder='Password' id="password" className='bg-slate-100 p-3 rounded-lg' />
<button className='bg-[#D86D25] text-white p-3 rounded-lg uppercase hover:opacity-75 hover:text-black'>Signu Up</button>
    </form>
    <div className='flex gap-4 m-5'>
    <p>Have an account ?</p>
    <Link to={'/signin'}><span className='text-blue-500'>Sign in</span></Link>
  
    </div>
      </div>
  )
}

export default Signup
