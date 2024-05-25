import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handelLogin = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your Name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8 || !password) {
      setError("Please enter the password");
      return;
    }
    setError(null);
    // SignUp API CALL
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        toast.success("Successfuly Account Created");
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
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className=" font-semibold text-4xl text-primary mt-5 mb-10">
        NoteNest
      </h1>
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form action="" onSubmit={handelLogin}>
          <h4 className="text-2xl mb-7 ">SignUp</h4>
          <input
            type="text"
            placeholder="Name"
            className="input-box"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
            SignUp
          </button>

          <p className="text-sm text-center mt-4">
            Already have an Account
            <Link
              to="/login"
              className="font-medium ml-2 text-primary underline"
            >
              SignIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
