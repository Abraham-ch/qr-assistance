import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Landing from "./pages/landing";
import Profile from "./pages/dashboard/profile";
import Report from "./pages/dashboard/report";
import Users from "./pages/dashboard/users";
import Overview from "./pages/dashboard/overview";
import QrScanner from "./pages/dashboard/qrScanner";
import Tuitition from "./pages/dashboard/tuitition";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route
                path="profile"
                element={<Profile />}
              />
              <Route
                path="report"
                element={<Report />}
              />
              <Route
                path="Overview"
                element={<Overview />}
              />
              <Route
                path="qr-reader"
                element={<QrScanner />}
              />
              <Route
                path="users"
                element={<Users />}
              />
              <Route
                path="tuitition"
                element={<Tuitition />}
              />
              </Route>
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;