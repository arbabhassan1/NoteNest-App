import React, { useEffect, useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
const AddEditNote = ({ getAllnotes, noteData, type, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  // Add Note

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        toast.success("New Note Added!");
        getAllnotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      }
    }
    onClose();
  };

  // Edit Note

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllnotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
    onClose();
  };

  //

  // HAndle Add Note

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");
    if (type == "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className=" relative">
      <button
        className=" w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className=" text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2 ">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          value={title}
          className=" text-2xl text-slate-950 outline-none "
          placeholder="Go To Gym At 5"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 ">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          value={content}
          className=" text-sm text-slate-950 outline-none  bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className=" text-sx text-red-500 pt-4">{error}</p>}
      <button
        className=" btn-primary font-medium p-3 mt-5"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNote;
