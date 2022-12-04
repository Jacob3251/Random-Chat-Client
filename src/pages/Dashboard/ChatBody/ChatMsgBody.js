import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import DotLoader from "react-spinners/DotLoader";
const ChatMsgBody = ({ chatRoomIdSpecific, profile, images }) => {
  const { receiverImg, senderImg } = images;
  const [chatMsgArray, setChatMsgArray] = useState([]);
  const [chatLength, setChatLength] = useState(chatMsgArray.length);
  const scrollFunc = () => {
    const element = document.getElementById("element");
    element.scrollIntoView();
  };
  useEffect(() => {
    // console.log("load", load);
    console.log("chatLength before", chatLength);
    if (chatRoomIdSpecific) {
      fetch(`http://localhost:5002/userchatscollection/${chatRoomIdSpecific}`)
        .then((res) => res.json())
        .then((data) => {
          setChatMsgArray(data);
        });
    }
    if (chatLength !== chatMsgArray.length) {
      scrollFunc();
      setChatLength(chatMsgArray.length);
      console.log("chatLength after", chatLength);
    }
  }, [chatRoomIdSpecific, chatMsgArray]);
  return (
    <div className="overflow-y-scroll w-full h-[90%] ">
      {chatMsgArray.length === 0 ? (
        <div className="flex justify-center items-center min-h-[100vh]">
          <DotLoader color="#6fafce" />
        </div>
      ) : (
        <div>
          {/* {chatLength !== 0 && alert(chatLength)} */}
          {chatMsgArray.map((item) => (
            <ChatMessage
              item={item}
              key={item._id}
              receiverImg={receiverImg}
              senderImg={senderImg}
            ></ChatMessage>
          ))}
          <div id="element"></div>
        </div>
      )}
    </div>
  );
};

export default ChatMsgBody;
