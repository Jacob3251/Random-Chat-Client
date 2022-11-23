import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ChatsContainer from "./ChatsContainer";
const Chats = () => {
  const userData = [
    {
      id: 1,
      name: "user1",
      time: "11/22/2022",
      imgLink:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/172F3/production/_123036949_gettyimages-1235149869.jpg",
    },
    {
      id: 2,
      name: "user2",
      time: "11/22/2022",
      imgLink: "https://pbs.twimg.com/media/EL2RmdKXkAA6IMt.jpg:large",
    },
    {
      id: 3,
      name: "user3",
      time: "11/22/2022",
      imgLink:
        "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    },
    {
      id: 4,
      name: "user4",
      time: "11/22/2022",
      imgLink:
        "https://lyricstranslate.com/files/styles/artist/public/loadimage.jpg",
    },
    {
      id: 5,
      name: "user5",
      time: "11/22/2022",
      imgLink:
        "https://cdn.britannica.com/61/137461-050-BB6C5D80/Brad-Pitt-2008.jpg",
    },
    {
      id: 3,
      name: "user3",
      time: "11/22/2022",
      imgLink:
        "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    },
    {
      id: 4,
      name: "user4",
      time: "11/22/2022",
      imgLink:
        "https://lyricstranslate.com/files/styles/artist/public/loadimage.jpg",
    },
    {
      id: 5,
      name: "user5",
      time: "11/22/2022",
      imgLink:
        "https://cdn.britannica.com/61/137461-050-BB6C5D80/Brad-Pitt-2008.jpg",
    },
    {
      id: 3,
      name: "user3",
      time: "11/22/2022",
      imgLink:
        "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    },
    {
      id: 4,
      name: "user4",
      time: "11/22/2022",
      imgLink:
        "https://lyricstranslate.com/files/styles/artist/public/loadimage.jpg",
    },
    {
      id: 5,
      name: "user5",
      time: "11/22/2022",
      imgLink:
        "https://cdn.britannica.com/61/137461-050-BB6C5D80/Brad-Pitt-2008.jpg",
    },
  ];
  const [searchTyping, setSearchTyping] = useState(true);
  const handleSearchTypingIcon = (e) => {
    const val = e.target.value;
    console.log(val);
    if (val) {
      setSearchTyping(false);
    } else {
      setSearchTyping(true);
    }
  };
  return (
    <div className=" w-[32%] p-5 border-r-[2px] h-full border-gray-200">
      <h3 className="text-2xl font-bold">Chats</h3>
      {/* Search button style */}
      <div className="relative my-2   ">
        <input
          type="text"
          className="rounded-xl h-[28px] pl-8 w-full outline-none bg-gray-200"
          placeholder="Search User"
          onChange={handleSearchTypingIcon}
        />
        {searchTyping && (
          <FaSearch className="absolute top-[6px] left-2 text-gray-400" />
        )}
      </div>
      {/* Chat option */}
      <div className="space-x-2">
        <button className="bg-blue-500 px-5 py-2 text-white border-0 hover:border-2 duration-200 hover:border-blue-500 hover:text-blue-500 hover:bg-white rounded-2xl">
          Inbox
        </button>
        <button className="bg-blue-500 px-5 py-2 text-white border-0 hover:border-2 duration-200 hover:border-blue-500 hover:text-blue-500 hover:bg-white rounded-2xl">
          Groups
        </button>
      </div>
      {/* chat tiles */}
      <div className="h-[80%] overflow-y-scroll">
        {userData.map((user) => (
          <ChatsContainer key={user.id} user={user}></ChatsContainer>
        ))}
      </div>
    </div>
  );
};

export default Chats;
