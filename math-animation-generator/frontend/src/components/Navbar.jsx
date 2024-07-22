import React from 'react';
import { NavLink } from 'react-router-dom';
// import Wrapper from '../assets/wrappers/Navbar';

const Navbar = () => {
  return (
    <nav className="bg-slate-800">
      <div className="align-element py-2 flex flex-col sm:flex-row sm:gap-x-24 sm:items-center sm:py-8">
        <h2 className="text-3xl font-bold text-zinc-300">
          Math<span className="text-emerald-600">Animation</span>
        </h2>
        <div className="flex flex-row gap-x-3">
          <NavLink 
            to="/" 
            className="capitalize text-lg text-zinc-300 tracking-wide hover:text-emerald-600 duration-300">
            Home
          </NavLink>
          <NavLink 
            to="/animation" 
            className="capitalize text-lg text-zinc-300 tracking-wide hover:text-emerald-600 duration-300">
            Animations
          </NavLink>
          <NavLink 
            to="/about" 
            className="capitalize text-lg text-zinc-300 tracking-wide hover:text-emerald-600 duration-300">
            About Us
          </NavLink>
        </div>
      </div>
      {/* <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/options">Animations</Link></li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
