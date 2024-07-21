import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../../appwrite/auth";
import {
  BackButton,
  BioEditForm,
  EmailEditForm,
  PasswordEditForm,
  NameEditForm,
  UsernameEditForm,
  ImageEditForm,
} from "../..";
import {
  updateReduxCurrentUser,
  updateReduxUser,
} from "../../../store/userSlice";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

function UserProfileEditForm() {
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const handleSubmit = async (updatedField, setLoading) => {
    setLoading(true);
    try {
      
      const updatedUser = await authService.updateAppwriteUser({
        currentUser,
        updateData: updatedField,
      });

      dispatch(updateReduxCurrentUser(updatedField));
      dispatch(updateReduxUser({ userId: currentUser?.$id, updatedField }));

      let keys = Object.keys(updatedField)
      if(keys[0] === "profilePicId"){
        toast.success("Image changed")
      }else{
        toast.success(`${keys[0].slice(0, 1).toUpperCase()}${keys[0].slice(1)} changed`)
      }

    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen md:border-r md:border-teal-500 text-white min-h-screen pb-20 sm:pb-5 md:w-11/12 xmd:w-10/12 xl:w-9/ ">
      <div
        className={` ${isEmailEditable && "hidden"} ${
          isPasswordEditable && "hidden"
        } block`}
      >
        <div className="flex gap-4 items-center ml-5 pt-5">
          <BackButton classname={`py-0`} />
          <h1>Edit profile</h1>
        </div>
        <div className="px-5 md:px-20 lg:px-32">
          <ImageEditForm
            handleSubmit={handleSubmit}
            currentUser={currentUser}
          />

          <NameEditForm handleSubmit={handleSubmit} currentUser={currentUser} />

          <UsernameEditForm
            handleSubmit={handleSubmit}
            currentUser={currentUser}
            users={users}
          />

          <BioEditForm handleSubmit={handleSubmit} currentUser={currentUser} />

          <div className="relative ">
            <div className="flex gap-4">
              <button
                className="text-blue-500 p-2 border border-blue-500 rounded-md transition-all duration-200 hover:bg-slate-950 hover:text-blue-300"
                onClick={() => setIsEmailEditable(true)}
              >
                Edit email
              </button>
              <button
                className="text-blue-500 p-2 border border-blue-500 rounded-md transition-all duration-200 hover:bg-slate-950 hover:text-blue-300"
                onClick={() => setIsPasswordEditable(true)}
              >
                Edit password
              </button>
            </div>
          </div>
        </div>
      </div>
      {isEmailEditable && (
        <EmailEditForm
          handleSubmit={handleSubmit}
          setIsEmailEditable={setIsEmailEditable}
          currentUser={currentUser}
          users={users}
        />
      )}

      {isPasswordEditable && (
        <PasswordEditForm setIsPasswordEditable={setIsPasswordEditable} />
      )}
    </div>
  );
}

export default UserProfileEditForm;
