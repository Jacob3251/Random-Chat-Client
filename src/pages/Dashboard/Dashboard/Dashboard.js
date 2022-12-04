import React, { useState } from "react";
import ChatBody from "../ChatBody/ChatBody";
import Chats from "../Chats/Chats";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase_init";
import { Link, useNavigate } from "react-router-dom";
import ABC from "../../Util/userContext";
const Dashboard = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({});
  return (
    <div className="h-[100vh] relative ">
      <h3 className="text-blue-500 h-[8vh]  text-3xl font-mono text-center pt-2">
        ...Inbox Terminal...
      </h3>
      <div className="absolute right-8 top-3 ">
        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-500 mr-5 px-3 py-1 shadow-lg text-white font-bold font-mono hover:shadow-blue-300 hover:-translate-y-1 duration-200 hover:text-blue-500 hover:bg-white"
        >
          Profile
        </button>
        <button
          onClick={() => {
            signOut(auth).then(() => alert("user log out"));
          }}
          className="bg-blue-500 px-3 py-1 shadow-lg text-white font-bold font-mono hover:shadow-blue-300 hover:-translate-y-1 duration-200 hover:text-blue-500 hover:bg-white"
        >
          Logout
        </button>
      </div>
      {/* chat part
       */}
      <div className="flex space-x-2 w-full h-[92vh]  justify-center border-t-2 border-gray-200">
        <ABC.Provider value={{ value, setValue }}>
          <Chats />
          <ChatBody />
        </ABC.Provider>
      </div>
    </div>
  );
};

export default Dashboard;
