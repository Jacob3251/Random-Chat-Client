import React from "react";

const ChatMessage = ({ item }) => {
  const { msgId, sender, content, files, time } = item;
  const profileImg1 =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKIQAMZVFULk9L5eiXFVNNhc7e_T441fKXg8FslyYv&s";
  const profileImg2 = "http://shorturl.at/fkrs9";

  return (
    <div>
      <div className={`w-full  flex my-2 `}>
        {sender === "jacobfrye3252@gmail.com" ? (
          <div className="flex w-full space-x-4 my-5 justify-start">
            <div className="h-[50px] w-[50px] rounded-full" title="User Image">
              <img
                src={profileImg1}
                className="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <div className="w-[50%] bg-slate-300 rounded-md p-5">
              <p>{content}</p>
              <p className="text-right text-sm text-gray-600">{time}</p>
            </div>
          </div>
        ) : (
          <div className="flex w-full space-x-4 my-5 justify-end">
            <div className="w-[50%] bg-blue-300 rounded-md p-5">
              <p>{content}</p>
              <p className="text-right text-sm text-gray-600">{time}</p>
            </div>
            <div className="h-[50px] w-[50px] rounded-full" title="User Image">
              <img
                src={profileImg2}
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
