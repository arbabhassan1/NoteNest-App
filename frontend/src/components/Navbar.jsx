import React, { useState } from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import { toast } from "react-toastify";

const Navbar = ({ userInfo, onSearchNote }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    } else {
      onSearchNote(""); // Reset search if query is empty
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearchNote(""); // Reset search when clearing
  };

  const onLogout = () => {
    localStorage.clear();
    toast.success("Successfully Logged Out!");
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium py-2 text-black">NoteNest</h2>
      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onClearSeacrh={clearSearch}
        handleSearch={handleSearch}
      />
      <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
    </div>
  );
};

export default Navbar;
