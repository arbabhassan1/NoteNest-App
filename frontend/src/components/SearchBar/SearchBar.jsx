import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({
  value,
  onChange,
  handleSearch,
  onClearSeacrh,
  display,
}) => {
  return (
    <div
      className={`w-80   items-center px-4 bg-slate-100 rounded-md ${display}`}
    >
      <input
        type="text"
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
        className="w-full text-xs bg-transparent py-[11px] outline-none"
      />
      {value && (
        <IoMdClose
          onClick={onClearSeacrh}
          className="text-xl cursor-pointer text-slate-400 hover:text-black mr-3"
        />
      )}
      <FaMagnifyingGlass
        onClick={handleSearch}
        className="text-xl cursor-pointer text-slate-400 hover:text-black"
      />
    </div>
  );
};

export default SearchBar;
