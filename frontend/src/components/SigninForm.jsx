import { React, useState } from "react";
import user from "../assets/user.svg";
import { Link, useNavigate } from "react-router-dom";
import { sendCode, signin } from "../services/api";

export const SigninForm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const response = await signin(data.email, data.password);
      localStorage.setItem("email", data.email);
      localStorage.setItem("token", response.token);
      console.log("Login successfully:", response);
      alert("Logged in successfully");
      navigate("/verify");
      await sendCode(data.email);
    } catch (error) {
      console.log(error);
      alert("Login error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="bg-gray-300 flex flex-col items-center w-100 rounded-xl">
      <div className="w-20 h-20">
        <img src={user} alt="user_icon" />
      </div>
      <div className="w-70 p-4">
        <div className="flex flex-col text-center justify-center gap-3">
          <h2 className="font-bold text-xl">Sign in Account</h2>
          <p className="text-gray-600 mb-6">
            Sign in to continue browse our webpage
          </p>
        </div>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
        <div className="grid grid-rows-4 gap-0">
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
          Sign in
        </button>
        </form>
        <p className="text-gray-500 font-sm mt-2">
          Don't have an account{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
