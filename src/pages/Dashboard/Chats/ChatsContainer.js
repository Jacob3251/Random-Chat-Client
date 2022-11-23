import React from "react";

const ChatsContainer = ({ user }) => {
  const { id, imgLink, name, time } = user;

  return (
    <div className="flex py-3 hover:bg-slate-100">
      <div className="h-[50px] w-[50px]">
        <img src={imgLink} alt="" className="w-full h-full rounded-full" />
      </div>
      <div className="ml-4">
        <h3>{name}</h3>
        <p className="text-gray-500">
          lastmsg &#x2022; <em className="text-[12px]">{time}</em>{" "}
        </p>
      </div>
    </div>
  );
};

export default ChatsContainer;
