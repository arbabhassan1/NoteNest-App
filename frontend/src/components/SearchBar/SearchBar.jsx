import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
const SearchBar = ({ value, onChange, handelSearch, onClearSeacrh }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
        className="w-full text-xs  bg-transparent py-[11px] outline-none "
      />
      <IoMdClose />
      <FaMagnifyingGlass />
    </div>
  );
};

export default SearchBar;
