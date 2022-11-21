import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase_init";
import DotLoader from "react-spinners/DotLoader";
const LandingPage = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  let errorElement;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  if (user) {
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
