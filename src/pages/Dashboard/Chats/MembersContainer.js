import React, { useContext } from "react";
import ABC from "../../Util/userContext";

const MembersContainer = ({ user }) => {
  const { imgLink, name, time } = user;
  const { value, setValue } = useContext(ABC);
  const handleChatRoom = () => {
    // localStorage.setItem("user", JSON.stringify(user));
    setValue(user);
  };
  return (
    <div className="flex py-3 hover:bg-slate-100" onClick={handleChatRoom}>
      <div className="h-[50px] w-[50px]">
        <img src={imgLink} alt="" className="w-full h-full rounded-full" />
      </div>
      <div className="ml-4 flex items-center">
        <h3 className="font-semibold font-mono">{name}</h3>
        {/* <p className="text-gray-500">
          lastmsg &#x2022; <em className="text-[12px]">{time}</em>{" "}
        </p> */}
      </div>
    </div>
  );
};

export default MembersContainer;
