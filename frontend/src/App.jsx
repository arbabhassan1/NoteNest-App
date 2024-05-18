import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/Signup";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
