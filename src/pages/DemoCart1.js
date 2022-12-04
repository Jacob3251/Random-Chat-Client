import React, { useEffect, useState } from "react";

const DemoCart1 = ({ id, name, designation, courses, photoURL }) => {
  const [savedDatas, setSavedDatas] = useState([]);
  const handleDelFromDb = () => {
    const modified = savedDatas.filter((u) => u.id !== id);
    console.log(modified);
    localStorage.setItem("savedCart", JSON.stringify(modified));
  };
  useEffect(() => {
    const savedDbData = localStorage.getItem("savedCart");

    if (savedDbData) {
      const savedData = JSON.parse(savedDbData);
      setSavedDatas(savedData);
    }
  }, [savedDatas]);
  return (
    <div className=" bg-slate-200 rounded-md w-[80%] px-[5%] mx-auto flex justify-between items-center my-5">
      <div className="flex w-[85%] py-5 rounded-md bg-slate-100 items-center">
        <div className="bg-blue-500 h-[200px] w-[18%] mr-4 rounded-full ">
          <img src={photoURL} className="w-full h-full rounded-full" alt="" />
        </div>
        <div className="w-[80%]">
          <h3>Name: {name}</h3>
          <h3>Post: {designation}</h3>
          <span>
            Courses:{" "}
            {courses.map((item) => (
              <span className="px-1">{item}</span>
            ))}
          </span>
        </div>
      </div>
      <div className="">
        <button
          onClick={handleDelFromDb}
          className="bg-slate-500 text-white font-bold font-mono p-3 hover:text-slate-500 rounded-full hover:bg-white duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DemoCart1;
