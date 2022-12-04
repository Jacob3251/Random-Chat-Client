import React, { useEffect, useState } from "react";

const useLoadSession = () => {
  const [sessionData, setSessionData] = useState({});
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const savedDbData = localStorage.getItem("user");
    if (savedDbData) {
      setUpdate(!update);
      setSessionData(JSON.parse(savedDbData));
    }
  }, []);
  return [sessionData, setSessionData];
};

export default useLoadSession;
