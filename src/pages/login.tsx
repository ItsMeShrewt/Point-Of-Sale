import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/macky.png";
import bg from "../assets/background.jpg";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "12345") {
      localStorage.setItem("isAuthenticated", "true");

      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 1000,
        style: {
          fontWeight: 400,
          fontSize: "18px",
        },
        onClose: () => navigate("/dashboard"),
      });
    } else {
      toast.error("Invalid credentials. Please try again.", {
        position: "top-right",
        autoClose: 1500,
        style: {
          fontWeight: 400,
          fontSize: "18px",
        },
      });
    }
  };

  const inputWidth = "w-[32rem]";

  return (
      <div
        className="flex min-h-screen items-center justify-center py-10"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className="flex shadow-md rounded-lg p-12 flex-col items-center w-[30rem]"
      style={{ backgroundColor: "#fff8dc" }}>
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-32 h-32 object-contain mb-4"
        />

        {/* Heading */}
        <h1 className="text-3xl font-semibold mb-1 text-center">Welcome back</h1>
        <small className="text-gray-400 text-base mb-6 text-center">Please enter your details</small>

        <form className="w-full flex flex-col items-center" onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4 w-3/4 flex flex-col">
            <label className="mb-2 text-base font-semibold text-left pl-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`rounded-md border border-gray-800 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-700 ${inputWidth}`}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4 w-3/4 flex flex-col">
            <label className="mb-2 text-base font-semibold text-left pl-2">
              Password
            </label>
            <input
              type="password"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-700 ${inputWidth}`}
              required
            />
          </div>

          {/* Sign In Button */}
          <div className="mb-3 w-full flex justify-center">
            <button
              type="submit"
              className="text-white w-1/4 bg-red-700 hover:bg-red-900 px-2 py-2 rounded-md"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
