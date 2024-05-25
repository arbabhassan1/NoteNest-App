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
    <div className="flex flex-col w-full sticky top-0 left-0">
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium py-2 text-black">NoteNest</h2>
        <SearchBar
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onClearSeacrh={clearSearch}
          handleSearch={handleSearch}
          display={"md:flex hidden"}
        />
        <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
      </div>
      <div className="w-full bg-white justify-center flex mt-3 items-center ">
        <SearchBar
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onClearSeacrh={clearSearch}
          handleSearch={handleSearch}
          display={"flex md:hidden"}
        />
      </div>
    </div>
  );
};

export default Navbar;
