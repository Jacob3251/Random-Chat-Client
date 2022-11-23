import React, { useEffect, useState } from "react";
import ChatBodyInfo from "../ChatBodyInfo/ChatBodyInfo";
import { FaEllipsisV } from "react-icons/fa";
import { userData, fakeChatData } from "../../Util/data";
import ChatMessage from "./ChatMessage";
import auth from "../../../firebase_init";
import { useAuthState } from "react-firebase-hooks/auth";
const ChatBody = () => {
  const [showChatBody, setShowChatBody] = useState(false);
  const [chatData, setChatData] = useState(fakeChatData);
  const [user] = useAuthState(auth);

  const handleNewMsg = (e) => {
    e.preventDefault();
    const message = e.target.msg.value;
    const newChatObj = {
      msgId: chatData.length + 1,
      sender: user?.email,
      content: message,
      files: "",
      time: "11/23/2022",
    };
    setChatData([...chatData, newChatObj]);

    // console.log(chatData);
    e.target.reset();
  };
  const handleAutoScroll = () => {
    var elem = document.getElementById("scrollDown");
    elem.scrollIntoView();
  };
  useEffect(() => {
    setTimeout(handleAutoScroll(), 1000);
  }, [chatData]);
  return (
    <div className={` ${showChatBody ? "w-[68%]  flex" : "w-[68%] "}`}>
      <div className=" w-[100%] h-full pb-1 border-r-2 border-gray-200">
        {/* <div className="flex justify-center items-center h-screen">
          <h3 className="text-xl font-medium text-gray-800">
            No Selected Chats
          </h3>
        </div> */}
        {/* chat title part */}
        <div className="flex justify-between items-center border-b-2 mr-1  border-slate-200">
          <div className="flex items-center">
            <div className="h-[50px] w-[50px] rounded-full m-2">
              <img
                src={userData[0].imgLink}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <h3 className="font-semibold text-lg">{userData[0].name}</h3>
          </div>
          <div className="mx-3 ">
            <button
              onClick={() => setShowChatBody(!showChatBody)}
              className="rounded-full hover:bg-blue-400 hover:text-white h-[30px] w-[30px] flex items-center justify-center"
            >
              <FaEllipsisV />
            </button>
          </div>
        </div>
        {/* Message body */}
        <div className="overflow-y-scroll h-[80%] scoller">
          {chatData.map((item) => (
            <ChatMessage item={item} key={item.msgId}></ChatMessage>
          ))}
          <div id="scrollDown"></div>
        </div>
        {/* msg input form */}
        <form
          onSubmit={handleNewMsg}
          className=" border-t-2 border-gray-200 w-full p-2 flex justify-between"
        >
          <input
            type="text"
            className="w-[80%] rounded-xl outline-none block bg-slate-200 pl-4 py-1"
            placeholder="Aa"
            name="msg"
          />
          <input
            type="submit"
            value="Send"
            className="w-[15%]  block bg-blue-500 rounded-lg text-white text-md hover:text-blue-500 hover:bg-white hover:border-[2px] hover:border-blue-500 border-[0px]"
          />
        </form>
      </div>
      {showChatBody && <ChatBodyInfo />}
    </div>
  );
};

export default ChatBody;
