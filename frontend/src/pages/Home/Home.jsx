import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import EmptyNoteImg from "../../assets/notes.png";
import { toast } from "react-toastify";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        toast.success("Successfully Deleted Note");
        getAllNotes(); // Refresh the notes after deletion
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error("An unexpected error occurred. Please try again");
      }
    }
  };

  // Handle Edit
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user", {});
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  };

  // Search Note
  const onSearchNote = async (query) => {
    if (!query) {
      setIsSearch(false);
      setSearchResults([]);
      getAllNotes(); // Reset to all notes if query is empty
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/search-note?query=${encodeURIComponent(query)}`
      );
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setSearchResults(response.data.notes);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again");
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  const notesToDisplay = isSearch ? searchResults : allNotes;

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} />
      <div className="container mx-auto md:px-10 px-5">
        {notesToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {notesToDisplay.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => {}}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={EmptyNoteImg}
            message={
              "Start creating your first note! Click the 'Add' button to join down your thoughts, ideas, and reminders. Let's get Started!"
            }
          />
        )}
      </div>
      <button
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        appElement={document.getElementById("root")}
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[90%] md:w-[50%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNote
          getAllNotes={getAllNotes}
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
