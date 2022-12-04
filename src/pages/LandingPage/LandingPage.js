import React, { useState, useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase_init";
import DotLoader from "react-spinners/DotLoader";
const LandingPage = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [users, setUsers] = useState([]);
  let errorElement;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  const createUser = () => {
    const match = users.find((element) => element.email === user?.user?.email);
    const data = {
      name: "",
      email: user.user.email,
      time: "10:200",
      imgLink: "",
      chats: [],
      groups: [],
    };
    // console.log(data);
    if (!match) {
      fetch("http://localhost:5002/users", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      return;
    }
  };
  if (user) {
    createUser();
    // console.log("user", user.user.email);
    navigate(from, { replace: true });
  }
  if (error) {
    errorElement = (
      <div className="text-red-500 text-center font-semibold">
        <p>Error: {error.message}</p>
      </div>
    );
  }
  const handleSocialLogin = () => {
    signInWithGoogle();
  };
  useEffect(() => {
    fetch("http://localhost:5002/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[100vh]">
          <DotLoader color="#6fafce" />
        </div>
      ) : (
        <div className="  mt-20 flex justify-center items-center">
          <div className=" space-y-10">
            <h3 className="pt-10 text-3xl text-blue-500 font-bold text-center">
              Chat with people everywhere
              <br /> ChatCilent here...
            </h3>
            <button
              onClick={handleSocialLogin}
              className=" flex justify-start items-center bg-blue-500 px-10 py-2 text-white text-md font-mono font-semibold hover:bg-white hover:text-blue-500 border-[2px] duration-200 hover:border-blue-500"
            >
              Login to chat <FaGoogle className="ml-3" />
            </button>
          </div>
          <img
            src="https://media.tenor.com/mQfsPM-LwPEAAAAi/robot-lunch.gif"
            alt=""
          />
        </div>
      )}
      {errorElement}
    </div>
  );
};

export default LandingPage;
