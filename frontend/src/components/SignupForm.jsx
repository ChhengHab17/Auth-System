import React from "react";
import user from "../assets/user.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api.js";

export const SignupForm = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const response = await signup(data.username, data.email, data.password);
      console.log("Registration response:", response);
      alert("Registration successful");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      alert(
        "Registration failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  return (
    <div className="bg-gray-300 flex flex-col items-center w-100 rounded-xl">
      <div className="w-20 h-20">
        <img src={user} alt="user_icon" />
      </div>
      <div className="w-70 p-4">
        <div className="flex flex-col text-center justify-center gap-3">
          <h2 className="font-bold text-xl">Create Account</h2>
          <p className="text-gray-600 mb-6">
            Sign up account to get access to our webpage
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-rows-4 gap-0">
            <label htmlFor="username">Username*</label>
            <input
              className="border-1 border-gray-400 p-2 rounded-lg"
              type="text"
              placeholder="username"
              value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                required
            />
            <label htmlFor="email">Email*</label>
            <input
              className="border-1 border-gray-400 p-2 rounded-lg"
              type="email"
              placeholder="email"
              value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
            />
            <label htmlFor="password">Password*</label>
            <input
              className="border-1 border-gray-400 p-2 rounded-lg"
              type="password"
              placeholder="password"
              value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
            />
          </div>
          <button className="w-full h-12 bg-blue-400 mt-6 rounded-lg text-base font-semibold">
            Sign up
          </button>
        </form>
        <p className="text-gray-500 font-sm mt-2">
          Already have account{" "}
          <Link to="/signin" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
