import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const loginForm = async (e) => {
    e.preventDefault();
    setUserName("");
    setEmail("");
    setPassword("");
    setLoader(true);

    try {
      const login = await fetch("http://localhost:4000/api/a1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });

      if (login.ok) {
        const data = await login.json();
        console.log("data", data);

        const token = data.data.accessToken;
        localStorage.setItem("token", token);

        const role = data.data.user.role;
        localStorage.setItem("role", role);
        console.log("role", role);

        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Login failed");
        alert("login failed!");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50">
      {loader && (
        <div className="absolute top-0 bg-slate-400 flex justify-center items-center z-[5] w-screen h-screen opacity-[0.8]">
          <div className="loader "></div>
        </div>
      )}
      <form
        onSubmit={loginForm}
        className=" max-w-[350px] w-full rounded-lg p-6 bg-white shadow-lg shadow-gray-500/40"
      >
        <h1 className="text-left mb-4 text-xl font-bold">Admin Panel</h1>
        <div className="mb-4">
          <p className="text-[14px] font-semibold text-gray-800 mb-2">
            UserName
          </p>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded font-medium outline-none"
            placeholder="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-[14px] font-semibold text-gray-800 mb-2">
            Email Address
          </p>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded font-medium outline-none"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-[14px] font-semibold text-gray-800 mb-2">
            Password
          </p>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded font-medium outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
