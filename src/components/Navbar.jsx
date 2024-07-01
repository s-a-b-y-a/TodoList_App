import React from "react";
import { FaTasks } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-purple-700 text-white py-2">
      <div className="flex">
        <FaTasks className="h-7"/>
        <div className="logo">
          <span className="font-bold text-xl mx-2">iTask</span>
        </div>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all">home</li>
        <li className="cursor-pointer hover:font-bold transition-all">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
