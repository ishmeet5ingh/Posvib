import React, { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import UserEditInput from "./UserEditInput";
import authService from "../../../appwrite/auth";
import { toast } from "react-toastify";

function EmailEditForm({
  handleSubmit,
  setIsEmailEditable,
  currentUser,
  users,
}) {
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const isEmailTaken = users.some(
      (user) => user.email === email && user.$id !== currentUser.$id
    );
    if (isEmailTaken) {
      setEmailError("Email is already taken");
      isValid = false;
    } else if (email === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password too short");
      isValid = false;
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      try {
        setLoading(true);
        const updateduser = await authService.account.updateEmail(
          email,
          password
        )
        if (updateduser) {
          handleSubmit({ email: email }, setLoading);
        }
      } catch (error) {
        setPasswordError("Incorrect Password");
        toast.error("Incorrect password");
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full absolute top-[10%] text-white px-5 md:px-20 lg:px-32">
      <button
        className="text-blue-500 my-10"
        onClick={() => setIsEmailEditable(false)}
      >
        <FaTimes size={30} />
      </button>
      <form onSubmit={handleEmailSubmit}>
        <div className="relative mb-4 flex flex-col gap-5">
          <div>
            <UserEditInput
              label="Email: "
              value={email}
              disabled={loading}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="relative">
            <UserEditInput
              label="Password: "
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              autoComplete="new-password"
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-[50%] transform -translate-y-1/2 text-xl"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <button
            className={`text-blue-500 flex justify-center p-2 border border-blue-500 rounded-md transition-all duration-200 hover:bg-slate-950 hover:text-blue-300`}
          >
            {loading ? (
              <div className="flex gap-2 center items-center">
                <div>Updating... </div>
                <div
                  className={`spinner w-5 h-5 hover:bg-black}`}
                ></div>
              </div>
            ) : (
              <p>Update email</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailEditForm;
