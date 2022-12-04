import React from "react";
import { auth } from "../../firebase_init";
import DotLoader from "react-spinners/DotLoader";
import { useLocation, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <DotLoader color="#6fafce" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
