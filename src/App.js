import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import RequireAuth from "./pages/Util/RequireAuth";
import Demo from "./pages/Demo";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/demo" element={<Demo />}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
