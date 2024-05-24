import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handelLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8 || !password) {
      setError("Please enter the password");
      return;
    }
    setError(null);

    // Login API CALL
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured: Please try again");
      }
    }

    // console.log(email, password);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form action="" onSubmit={handelLogin}>
            <h4 className="text-2xl mb-7 ">Login</h4>
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {error && <p className="text-sm text-red-600 py-1">{error}</p>}
            <button type="submit " className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?
              <Link
                to="/signup"
                className="font-medium ml-2 text-primary underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
