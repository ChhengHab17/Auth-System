import React from "react";
import lock from "../assets/lock.svg";
import { useState, useRef } from "react";
import { sendCode, verifyCode } from "../services/api";
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "./CountDown";
import { CodePopup } from "./CodePopup";

export const CodeVerification = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [timerResetCounter, setTimerResetCounter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const initialTimer = 5 * 60 * 1000;

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus to next input
      if (value && index < code.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = async (e) => {
    try {
      const email = localStorage.getItem('email');
      const enteredCode = code.join('');
      const response = await verifyCode(email, enteredCode);
      console.log("Code verification Successfully", response);
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Login error: " + (error.response?.data?.message || error.message));
    }
  };
  const resendCode = async () =>{
    try{
      setIsOpen(true);
      setTimerResetCounter((c) => c + 1);
      const email = localStorage.getItem('email');
      const response = await sendCode(email);
      console.log("Code verification Successfully", response);
    }catch{
      console.log(error);
      alert("Login error: " + (error.response?.data?.message || error.message));
    }
  }
  return (
    <div className="bg-gray-200 flex flex-col items-center w-120 h-100 rounded-xl p-4 justify-center drop-shadow-lg">
      <div className="w-20 h-20">
        <img src={lock} alt="locking" />
      </div>
      <div className="flex flex-col w-100 p-4 items-center">
        <CountdownTimer initialTime={initialTimer} resetTrigger={timerResetCounter}/>
        <h2 className="text-xl font-bold">Enter Code Verification</h2>
        <p className="text-gray-600 mb-6">
          Enter code that we sent too your Gmail account
        </p>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <div className="flex gap-1">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength="1"
                className="w-12 h-12 text-center text-lg font-bold border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>
          <button className="w-70 h-12 bg-blue-400 mt-6 rounded-lg text-base font-semibold">
            Submit
          </button>
        </form>
      </div>
      <p className="flex justify-between text-sm">
        Didn't get code <button onClick={resendCode} className="text-blue-500 ml-2 cursor-pointer"> resend</button>
      </p>
      <CodePopup isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </div>
  );
};
