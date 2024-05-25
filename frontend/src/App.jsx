import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/Signup";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Copyright from "./components/Copyright";
const App = () => {
  return (
    <>
      <div className="relative">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
          </Routes>
        </Router>
        <ToastContainer />
        <Copyright />
      </div>
    </>
  );
};

export default App;
