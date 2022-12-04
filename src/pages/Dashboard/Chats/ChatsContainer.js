import { data } from "autoprefixer";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase_init";
import moment from "moment";
import ABC from "../../Util/userContext";
const ChatsContainer = ({ chatRoomId }) => {
  const curTime = moment().format("lll");
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [lastMsgTime, setLastMsgTime] = useState("");
  const { value, setValue } = useContext(ABC);
  const handleInboxedUser = () => {
    if (Object.keys(userData).length !== 0) {
      const { _id, name, email, time, imgLink, chats, groups } = userData;
      const userContextData = {
        _id: _id,
        name: name,
        email: email,
        time: time,
        imgLink: imgLink,
        chats: chats,
        groups: groups,
      };
      setValue(userContextData);
    }
  };
  useEffect(() => {
    if (user) {
      const key = user.email;
      // console.log("key=>", key);
      fetch(`http://localhost:5002/inboxedUser/${key + "*" + chatRoomId}`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
    if (Object.keys(userData).length !== 0) {
      // console.log("last msg object", userData.lastmsg);
      const timey = moment(userData.lastmsg.time, "lll");
      const oldtime = userData?.time;
      // alert(moment(timey).fromNow());
      setLastMsgTime(moment(timey).fromNow());
    }
  }, [userData, lastMsgTime]);
  return (
    <div className="flex py-3 hover:bg-slate-100" onClick={handleInboxedUser}>
      <div className="h-[50px] w-[50px]">
        <img
          src={userData.imgLink}
          alt=""
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="ml-4">
        <h3>{userData.name}</h3>
        <p className="text-gray-500">
          {userData?.lastmsg?.msg} &#x2022;{" "}
          <em className="text-[12px]">{lastMsgTime}</em>
        </p>
      </div>
    </div>
  );
};

export default ChatsContainer;
