import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Landing from "./components/landing";
import Profile from "./components/dashboard/profile";
import Settings from "./components/dashboard/settings";
import Overview from "./components/dashboard/overview";
import QrScanner from "./components/dashboard/qrScanner";

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
                path="settings"
                element={<Settings />}
              />
              <Route
                path="Overview"
                element={<Overview />}
              />
              <Route
                path="qr-reader"
                element={<QrScanner />}
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