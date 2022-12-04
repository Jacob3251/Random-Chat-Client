import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase_init";
import { userData } from "../../Util/data";

const ChatMessage = ({ item, senderImg, receiverImg }) => {
  const { sender, msg, files, time } = item;
  const [user] = useAuthState(auth);
  // console.log(item);

  return (
    <div>
      <div className={`w-full  flex my-2 `}>
        {item.receiver === user?.email ? (
          <div className="flex w-full space-x-4 my-5 justify-start">
            <div className="h-[50px] w-[50px] rounded-full" title="User Image">
              <img
                src={receiverImg}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <div className="w-[50%] bg-purple-300 rounded-md p-5">
              <p>{msg}</p>
              <p className="text-right text-sm text-gray-600">{time}</p>
            </div>
          </div>
        ) : (
          <div className="flex w-full space-x-4 my-5 justify-end">
            <div className="w-[50%] bg-blue-300 rounded-md p-5">
              <p>{msg}</p>
              <p className="text-right text-sm text-gray-600">{time}</p>
            </div>
            <div className="h-[50px] w-[50px] rounded-full" title="User Image">
              <img
                src={senderImg}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
