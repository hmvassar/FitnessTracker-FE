import React from "react";
import {  NavLink } from "react-router-dom";


const Navigation = () => {
  return (
    <nav className="navbar p-4 flex justify-between items-center mx-auto border-4  bg-beige-200  ">
      <h1 className="text-black-400">Fitness Tracker</h1>
      <div>
        <NavLink
          to={"/"}
          className="hover:text-black-500"
        >
          Home
        </NavLink>
        <NavLink to={"/routines"} className=" p-4 hover:text-black-300">
          Routines
        </NavLink>

        <NavLink to={"/routines/me"} className=" p-4 hover:text-black-300">
          MyRoutines
        </NavLink>
        <NavLink to={"/activities"} className=" p-4 hover:text-black-300">
          Activities
        </NavLink>
        <NavLink to={"/login"} className=" p-4 hover:text-black-300">
          Login/Register
        </NavLink>
      </div>
    </nav>
  );
};
export default Navigation;