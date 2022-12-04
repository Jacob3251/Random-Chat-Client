import React, { useContext, useEffect, useState } from "react";
import ChatBodyInfo from "../ChatBodyInfo/ChatBodyInfo";
import { FaEllipsisV } from "react-icons/fa";
import { userData, fakeChatData } from "../../Util/data";
import ChatMessage from "./ChatMessage";
import { auth } from "../../../firebase_init";
import { useAuthState } from "react-firebase-hooks/auth";
import useChatLoad from "../../Util/useChatLoad";
import useLoadSession from "../../Util/useLoadSession";
import moment from "moment";
import { v4 } from "uuid";
import ABC from "../../Util/userContext";
import { json } from "react-router-dom";
import ChatMsgBody from "./ChatMsgBody";
const ChatBody = () => {
  const [showChatBody, setShowChatBody] = useState(false);
  const { value } = useContext(ABC);
  // const [contextEmail, setContextEmail] = useState("");

  // useStates for preSent msg'es
  // const [load, setLoad] = useState(false);
  // const [chatMsgId, setChatMsgId] = useState("");
  // const handleLoad = () => {
  //   setLoad(false);
  // };
  const [user] = useAuthState(auth);
  // handling input
  const [chatRoomIdObj, setChatRoomIdObj] = useState({});
  const [chatRoomIdSpecific, setChatRoomIdSpecific] = useState("");
  // handling users profile link
  const [userProfile, setUserProfile] = useState({});
  const handleAutoScroll = () => {
    const elem = document.getElementById("scrollDown");
    elem.scrollIntoView();
  };

  function findChatRoomId(email1, email2) {
    // console.log("Value Email", value.email);
    // console.log("Context Email", contextEmail);

    const participents = [email1, email2];
    const email = participents[0] + "*" + participents[1];
    console.log(email);

    const preUrl = `http://localhost:5002/prechatcollection/${email}`;
    fetch(preUrl)
      .then((res) => res.json())
      .then((data) => {
        setChatRoomIdObj(data);
        setChatRoomIdSpecific(data.id);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }
  const handleFirstNewMsg = (e) => {
    e.preventDefault();

    // alert(chatRoomIdSpecific);
    const contentMsg = e.target.msg.value;

    if (chatRoomIdSpecific === null) {
      alert("no id");
      const newChatRoomID = v4();
      alert("New Chatroom iD", newChatRoomID);
      // console.log("inside empty chatroomID", chatRoomId.id);
      // creating collections containing messages with uuid name
      const url3 = `http://localhost:5002/userchatscollection`;
      const time = moment().format("lll");
      const url3BodyObj = {
        chatRoomID: newChatRoomID,
        sender: user.email,
        receiver: value.email,
        msg: contentMsg,
        time: time,
      };
      fetch(url3, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(url3BodyObj),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success creating collections:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // creating ChatRooms info Collections
      const url2 = `http://localhost:5002/userchatcollection`;
      const url2BodyObj = {
        chatRoomID: newChatRoomID,
        members: [user.email, value.email],
      };
      fetch(url2, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(url2BodyObj),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success: chatroom info", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // ********************** do this part last
      const url1 = `http://localhost:5002/userchat`;
      // updating both profile chat array
      const url1BodyObj = {
        user1: user.email,
        user2: value.email,
        chatRoomID: newChatRoomID,
      };
      fetch(url1, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(url1BodyObj),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      window.location.reload();
    } else {
      // alert(chatRoomIdSpecific);
      alert("Old chatroom id", chatRoomIdSpecific);
      const url3 = `http://localhost:5002/usermsgchatscollection`;
      const time = moment().format("lll");
      const url3BodyObj = {
        chatRoomID: chatRoomIdSpecific,
        sender: user.email,
        receiver: value.email,
        msg: contentMsg,
        time: time,
      };
      fetch(url3, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(url3BodyObj),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success updating the remaining msg db:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    e.target.reset();
  };
  useEffect(() => {
    if (value.email != undefined) {
      const e1 = user?.email;
      const e2 = value.email;
      console.log("user email", e1, "value email", e2);
      findChatRoomId(e1, e2);
      // console.log(chatRoomIdSpecific);
    }
    const profileUrl = `http://localhost:5002/user/${user?.email}`;
    fetch(profileUrl)
      .then((res) => res.json())
      .then((data) => setUserProfile(data));

    // console.log("useEffect ran outside condition");
  }, [value.email]);

  return (
    <div className="w-full ">
      {Object.keys(value).length !== 0 ? (
        <div className="relative  h-full">
          {/* other user profile part */}
          <div className="h-[12%] border-b-2 border-gray-200 flex space-x-4 items-center">
            <div className="h-[50px] w-[50px] rounded-full ml-5">
              <img
                src={value.imgLink}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <h3 className="font-bold"> {value.name}</h3>
          </div>
          {/* {value && <p>{value.name}</p>} */}

          {/* existing messages */}
          {/* {chatRoomIdSpecific && alert(chatRoomIdSpecific)} */}
          <div className=" h-[80%] ">
            {chatRoomIdSpecific && (
              <ChatMsgBody
                images={{
                  receiverImg: value.imgLink,
                  senderImg: userProfile.imgLink,
                }}
                chatRoomIdSpecific={chatRoomIdSpecific}
              ></ChatMsgBody>
            )}
          </div>
          {/* <div className="overflow-y-scroll h-[78%] bg-blue-500">
            {chatMsgArray.map((item) => (
              <ChatMessage
                item={item}
                key={item._id}
                images={{
                  receiverImg: value.imgLink,
                  senderImg: userProfile.imgLink,
                }}
              ></ChatMessage>
            ))}
          </div> */}
          <div className="absolute bottom-0 left-0 w-full py-2 border-t-2 border-gray-200 bg-slate-300">
            <form
              onSubmit={handleFirstNewMsg}
              className="  w-full p-2 flex justify-between"
            >
              <input
                type="text"
                className="w-[80%] h-[20%] rounded-xl outline-none block bg-white pl-4 py-1"
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
      ) : (
        <div className="justify-center items-center flex h-full bg-white">
          <h3 className="font-bold text-xl">No Chats Selected</h3>
        </div>
      )}
    </div>
  );
};

export default ChatBody;
