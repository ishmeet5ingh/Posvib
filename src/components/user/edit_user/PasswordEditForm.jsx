import React, { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import UserEditInput from "./UserEditInput";
import authService from "../../../appwrite/auth";
import { toast } from "react-toastify";

function PasswordEditForm({ setIsPasswordEditable }) {
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (oldPassword === "") {
      setOldPasswordError("Password is required");
      isValid = false;
    } else if (oldPassword.length < 8) {
      setOldPasswordError("Password too short");
      isValid = false;
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(oldPassword)) {
      setOldPasswordError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
      );
      isValid = false;
    } else {
      setOldPasswordError("");
    }

    if (newPassword === "") {
      setNewPasswordError("Password is required");
      isValid = false;
    } else if (newPassword.length < 8) {
      setNewPasswordError("Password too short");
      isValid = false;
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword)) {
      setNewPasswordError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
      );
      isValid = false;
    } else {
      setNewPasswordError("");
    }

    if (isValid) {
      try {
        setLoading(true);
        const updateduser = await authService.account.updatePassword(
          newPassword,
          oldPassword
        );
        if (updateduser) {
          toast.success("Password Changed");
          setLoading(false);
        }
      } catch (error) {
        setOldPasswordError("Incorrect Password");
        toast.error("Incorrect password");
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full absolute top-[10%] text-white px-5 md:px-20 lg:px-32">
      <button
        className="text-blue-500 mb-10"
        onClick={() => {
          setIsPasswordEditable(false);
        }}
      >
        <FaTimes size={30} />
      </button>
      <form onSubmit={handlePasswordSubmit}>
        <div className="mb-4 flex flex-col gap-5">
          <div className="relative">
            <UserEditInput
              label="Old password: "
              type={isOldPasswordVisible ? "text" : "password"}
              value={oldPassword}
              aut
              disabled={loading}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setOldPasswordError("");
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-[40%]  text-xl"
              onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
            >
              {isOldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            {oldPasswordError && (
              <p className="text-red-500 text-sm">{oldPasswordError}</p>
            )}
          </div>
          <div className="relative">
            <UserEditInput
              label="New password: "
              type={isNewPasswordVisible ? "text" : "password"}
              value={newPassword}
              autoComplete="new-password"
              disabled={loading}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setNewPasswordError("");
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-[60%] text-xl"
              onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
            >
              {isNewPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            {newPasswordError && (
              <p className="text-red-500 text-sm">{newPasswordError}</p>
            )}
          </div>
          <button
            className={`text-blue-500 p-2 border flex justify-center  border-blue-500 rounded-md transition-all duration-200 hover:bg-slate-950 hover:text-blue-300 gap-2`}
          >
            {loading ? (
              <div className="flex gap-2 center items-center">
                <div>Updating... </div>
                <div
                  className={`spinner w-5 h-5 hover:bg-black}`}
                ></div>
              </div>
            ) : (
              <p>Update password</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordEditForm;
