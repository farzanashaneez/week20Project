import React from "react";
import{Link}from 'react-router-dom'

const Header = () => {
  return (
    <div className=" bg-[#2d6971] ">
      <div className="flex justify-between items-center m-8 mt-0 h-16">
         <Link to={'/'}>
         <div> <svg width="220" height="50" xmlns="http://www.w3.org/2000/svg">
            <rect width="220" height="50" fill="#D86D25" rx="15" ry="15" />

            <text
              x="20"
              y="35"
              font-family="Comic Sans MS, sans-serif"
              font-size="25"
              fill="#ffffff"
              font-weight="bold"
            >
              UMS
            </text>

            <text
              x="90"
              y="35"
              font-family="Comic Sans MS, sans-serif"
              font-size="20"
              fill="#ffffff"
            >
              Client
            </text>

            <circle cx="170" cy="25" r="8" fill="white" />
            <circle cx="185" cy="35" r="5" fill="white" />
            <circle cx="189" cy="20" r="3" fill="white" />

          </svg>
          </div>
          </Link>
        <ul className="flex gap-16 font-bold text-white">
         <Link to={'/'}> <li>Home</li></Link>
         <Link to={'/about'}><li>About</li></Link>
         <Link to={'/signin'}><li>Sign In</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
