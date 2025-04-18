import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/macky.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "12345") {
      localStorage.setItem("isAuthenticated", "true");
      Swal.fire({
        icon: "success",
        html: `<h2 class="text-2xl font-bold">Admin Login Successful!</h2>`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/dashboard");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid credentials",
        text: "Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-end min-h-screen bg-red-300" style={{ padding: '150px'}}>
      <div className="bg-blue-100 shadow-lg rounded-lg p-8 pr-20 w-full max-w-lg flex flex-col justify-center items-center text-center" style={{ height: '500px' }}>

        
        <img
          src={logo}
          alt="Clinic Logo"
          className="h-24 w-24 object-contain mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome Back
        </h2>
        <p className="text-lg font-semibold mb-6 text-gray-800">
          Please enter the details to login
        </p>

        <form onSubmit={handleLogin} className="space-y-5 w-full max-w-md flex flex-col items-center">
          
          <div className="flex flex-col w-full text-left">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 focus:ring-0"
              required
            />
          </div>

          <div className="flex flex-col w-full text-left">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 focus:ring-0"
              required
            />
          </div>

          <button
            type="submit"
            className="w-48 h-12 bg-blue-500 text-white font-medium text-lg rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
