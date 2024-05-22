import React, { useState } from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {};
  const clearSearch = () => {
    setSearchQuery("");
  };
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className=" text-xl font-medium py-2 text-black">NoteNest</h2>{" "}
      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onClearSeacrh={clearSearch}
        handelSearch={handleSearch}
      />
      <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
    </div>
  );
};

export default Navbar;
