import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputVAlue] = useState("");

  const handleInputChange = (e) => {
    setInputVAlue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue == "") {
      return;
    }
    if (inputValue.trim !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputVAlue("");
    }
  };

  const handleKeyDown = () => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div>
        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 p-1 rounded"
              >
                #{tag}
                <button onClick={() => handleRemoveTag(tag)}>
                  <MdClose />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          placeholder="Add tags"
          className=" bg-transparent border px-3 py-2 rounded outline-none"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        <button
          onClick={() => {
            addNewTag();
          }}
          className=" w-8 h-8 flex items-center justify-center rounded border hover:bg-blue-700 border-blue-700 "
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;