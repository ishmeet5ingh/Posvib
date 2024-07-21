import React, { useEffect, useState } from "react";
import { UserEditButton, UserEditInput, Input } from "../..";
import authService from "../../../appwrite/auth";

function ImageEditForm({ handleSubmit, currentUser }) {
  const [imageUrl, setImageUrl] = useState(
    currentUser.profilePicId
      ? authService.getFilePreview(currentUser.profilePicId)
      : currentUser.imageUrl
  );
  const [profilePicId, setProfilePicId] = useState(currentUser?.profilePicId);
  const [image, setImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    setImageUrl(
      currentUser.profilePicId
        ? authService.getFilePreview(currentUser.profilePicId)
        : currentUser.imageUrl
    );
    setProfilePicId(currentUser?.profilePicId);
  }, [currentUser]);

  const handleFileChange = (e) => {
    if(e.target.files[0]){
      const file = e.target.files[0];
      setImage(file);
      if (file) {
        setImageUrl(URL.createObjectURL(file));
      }
    }else{
      return false
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault()

      if (image) {
        setLoadingImage(true)
        const file = image ? await authService.uploadAppwriteFile(image) : null;
        if (file) {
          authService.deleteAppwriteFile(currentUser?.profilePicId); // Delete previous file if new file uploaded
        }
        // setPassword()
        handleSubmit({ profilePicId: file?.$id }, setLoadingImage);
      }
  
  };

  return (
    <form onSubmit={handleImageSubmit}>
      <div className="flex flex-col gap-3 items-center relative">
        <img
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full"
          src={`${imageUrl}`}
          alt=""
        />
        <div className="flex items-center gap-4">
        <Input
          label="select picture"
          onChange={handleFileChange}
          disabled={loadingImage}
          labelColor="text-blue-500 cursor-pointer"
          type="file"
          InputCss="hidden"
        />
          <button
            className={`text-blue-500 flex justify-center p-2 border border-blue-500 rounded-md transition-all duration-200 hover:bg-slate-950 hover:text-blue-300 text-sm`}
          >
            {loadingImage ? (
              <div className="flex gap-2 center items-center">
                <div>Updating... </div>
                <div
                  className={`spinner w-4 h-4 hover:bg-black}`}
                ></div>
              </div>
            ) : (
              <p>Update image</p>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ImageEditForm;
