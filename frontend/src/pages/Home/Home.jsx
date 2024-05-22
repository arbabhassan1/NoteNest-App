import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    date: null,
  });
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

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

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <div className="container mx-auto md:px-10 px-5   ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          <NoteCard
            title={"Meating on 14th June"}
            date={"June 14,2024"}
            content={"Meating about the climate Chane with World Leaders "}
            tags={"#metting"}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", date: null });
        }}
        className="w-16 h-16 flex items-center justify-center  rounded-2xl bg-primary hover:bg-blue-600  absolute right-10 bottom-10"
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className=" w-[90%] md:w-[50%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.date}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", date: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
