import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";

const Signup = () => {
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

    console.log(email, password);
  };
  return (
    <div className="flex items-center justify-center mt-28">
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
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Not registered yet?
            <Link to="/signup" className="font-medium text-primary underline">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
