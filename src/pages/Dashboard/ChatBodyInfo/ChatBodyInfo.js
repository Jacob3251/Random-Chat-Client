import React from "react";
import { FaCreativeCommonsBy } from "react-icons/fa";
const ChatBodyInfo = () => {
  return (
    <div className="w-[50%] h-full px-5">
      <div className=" h-[11%] border-b-2  border-gray-200 flex justify-center items-center">
        <h1 className="font-bold text-2xl">Chat Options</h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-[10%]">
        <div className="h-[100px] w-[100px] rounded-full">
          <img
            src="http://shorturl.at/fkrs9"
            alt=""
            className="h-full w-full rounded-full"
          />
        </div>
        <h3 className="my-5 text-xl font-semibold font-mono">User 1</h3>
        <div className="flex flex-col items-center ">
          <div className="bg-slate-200 p-2 rounded-full">
            <FaCreativeCommonsBy className="text-5xl bg-white p-2 rounded-full" />
          </div>
          <h3 className="my-2 text-md font-serif font-bold">Profile</h3>
        </div>
      </div>
      <div className="border-b-2 border-slate-200">
        <p className="text-lg font-medium">Files:</p>
      </div>
      {/* files links below */}
      <p className="text-[14px] text-gray-800">No files uploaded yet</p>
    </div>
  );
};

export default ChatBodyInfo;
