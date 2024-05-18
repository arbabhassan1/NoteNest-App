import React from "react";
import ProfileInfo from "./Cards/ProfileInfo";
const Navbar = () => {
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium py-2 text-black">Notes App</h2>
      <ProfileInfo />
    </div>
  );
};

export default Navbar;
