import React from "react";
import ChatBody from "../ChatBody/ChatBody";
import Chats from "../Chats/Chats";

const Dashboard = () => {
  return (
    <div className="h-[100vh]">
      <h3 className="text-blue-500 h-[8vh]  text-3xl font-mono text-center pt-2">
        ...Inbox Terminal...
      </h3>
      {/* chat part
       */}
      <div className="flex space-x-2 w-full h-[92vh]  justify-center border-t-2 border-gray-200">
        <Chats />
        <ChatBody />
      </div>
    </div>
  );
};

export default Dashboard;
