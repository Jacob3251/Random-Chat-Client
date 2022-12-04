import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "../../firebase_init";
import { FaUpload } from "react-icons/fa";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { data } from "autoprefixer";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [moveToMsg, setMoveToMsg] = useState(true);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [fileList, setFileList] = useState([]);
  const nameRef = useRef();
  const [imglink, setimglink] = useState("");
  const [userData, setUserData] = useState([]);
  const [file, setFile] = useState(null);
  const fileListRef = ref(storage, "profileimages/");
  const navigate = useNavigate();
  const url = `http://localhost:5002/user/${user.email}`;
  const handleUpdateProfile = () => {
    const updatedName = nameRef.current.value;
    if (updatedName == "" || file == null) {
      alert(
        "You haven't entered any name or image. Incase of image make sure to click the upload button under the image"
      );
      return;
    } else {
      const userObj = {
        id: userData._id,
        name: updatedName,
        time: userData.time,
        imgLink: imglink,
        chats: [...userData.chats],
        groups: [...userData.groups],
      };
      fetch(url, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // alert(updatedName);
      // console.log(imglink);
      setUpdateProfile(!updateProfile);
    }
  };
  const uploadfile = () => {
    if (file == null) return;
    console.log("func ran");
    const fileRef = ref(storage, `images/${file.name + v4()}`); //folder in firebase storage for uploded image
    uploadBytes(fileRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        alert("img added");
        setimglink(url);
      });
    });
  };
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data));
    if (userData?.name == "") {
      setMoveToMsg(false);
    } else {
      setMoveToMsg(true);
    }
  }, [userData]);
  return (
    <div className="w-[80%] mx-auto">
      <header className="bg-slate-100 p-5 w-[50%] mx-auto rounded-full mt-20">
        <h1 className="text-4xl text-center text-blue-500 font-semibold font-mono">
          Profile
        </h1>
      </header>
      <main className=" w-[55%] mx-auto  my-20">
        <div className="flex flex-col-reverse w-full justify-between items-center">
          <div className="mx-10 space-y-12">
            <div className="bg-slate-100 w-[400px]  h-[50px] flex justify-evenly items-center rounded-full">
              <span className="">User Profile ID: </span>
              <input type="text" value={userData?._id} readOnly />
            </div>
            <div className="bg-slate-100 w-[400px]  h-[50px] flex justify-evenly items-center rounded-full">
              <span className="">User Name: </span>
              <input
                type="text"
                ref={nameRef}
                placeholder={
                  userData?.name === "" ? "Not updated" : userData?.name
                }
                readOnly={!updateProfile}
              />
            </div>
            <div className="bg-slate-100 w-[400px]  h-[50px] flex justify-evenly items-center rounded-full">
              <span className="">User Email: </span>
              <input type="text" value={userData?.email} readOnly />
            </div>

            <div className="bg-slate-100 w-[400px]  h-[50px] flex justify-evenly items-center rounded-full">
              <span className="">JOIN Date: </span>
              <input type="text" value={userData?.time} readOnly />
            </div>
          </div>
          <div className="mx-10 mb-5 flex justify-center flex-col items-center">
            {userData?.imgLink ? (
              <div className="h-[200px] w-[200px] bg-slate-100 flex justify-center items-center">
                <img
                  src={userData?.imgLink}
                  className="w-full"
                  alt="userImage"
                />
              </div>
            ) : (
              <div className="relative h-[200px] w-[200px] bg-green-200 rounded-md flex justify-center items-center">
                {imglink && <img src={imglink} className="w-full" />}
                {!updateProfile && (
                  <div className="absolute top-[40%] left-[25%]">
                    <p>Not Uploaded</p>
                  </div>
                )}
              </div>
            )}

            {updateProfile && (
              <div className=" flex justify-center items-center w-full -mt-[4px] pt-2 pb-1 rounded-b-[10px] bg-slate-100">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className=" w-[97px] block"
                  // style={{ visibility: "hidden" }}
                />

                <FaUpload
                  onClick={uploadfile}
                  className="ml-5 text-2xl text-green-500 hover:text-blue-500"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-[50%] mx-auto h-[60px]  flex justify-center items-center my-5">
          {updateProfile === false ? (
            <button
              onClick={() => setUpdateProfile(!updateProfile)}
              className="bg-blue-500  px-3 py-2 shadow-lg text-white font-bold font-mono hover:shadow-blue-300 hover:-translate-y-1 duration-200 hover:text-blue-500 hover:bg-white"
            >
              Update Profile
            </button>
          ) : (
            <button
              onClick={handleUpdateProfile}
              className="bg-blue-500  px-3 py-2 shadow-lg text-white font-bold font-mono hover:shadow-blue-300 hover:-translate-y-1 duration-200 hover:text-blue-500 hover:bg-white"
            >
              Done
            </button>
          )}
          {moveToMsg && (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-500 ml-2  px-3 py-2 shadow-lg text-white font-bold font-mono hover:shadow-blue-300 hover:-translate-y-1 duration-200 hover:text-blue-500 hover:bg-white"
            >
              Go to messages
            </button>
          )}
          {updateProfile && (
            <button
              onClick={() => setUpdateProfile(!updateProfile)}
              className="bg-blue-500 ml-2  px-3 py-2 shadow-lg text-white font-bold font-mono hover:shadow-blue-300 hover:-translate-y-1 duration-200 hover:text-blue-500 hover:bg-white"
            >
              Cancel
            </button>
          )}
        </div>
      </main>
      {/* {file && <img className="w-full h-[300px]" src={imglink} />} */}
    </div>
  );
};

export default Profile;
