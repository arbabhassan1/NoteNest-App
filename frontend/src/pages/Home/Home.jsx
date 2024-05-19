import React from "react";
import NoteCard from "../../components/Cards/NoteCard";

const Home = () => {
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
    </>
  );
};

export default Home;
