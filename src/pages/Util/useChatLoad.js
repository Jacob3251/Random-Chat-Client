import React, { useEffect, useState } from "react";

const useChatLoad = (email) => {
  const [chatData, setChatData] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5002/user/${email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setChatData(data.chats));
  }, []);
  return [chatData];
};

export default useChatLoad;
