import React, { useState } from "react";
import appwriteService from "../../appwrite/config";
import {
  Avatar,
  ProgressBarComponent,
  FileInput,
  PostTextarea,
  Button,
} from "..";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../store/configSlice";
import {
  useSlugTransform,
  useHandleFileChange,
  useHandleTextareaInput,
  useFormInitialization,
  useProgress,
} from "./hooks";


function PostForm({ post, idx }) {
  const slugTransform = useSlugTransform();
  const { register, handleSubmit, getValues, reset } = useFormInitialization(
    post,
    slugTransform
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileSize, setFileSize] = useState(null)
  
  const handleTextareaInput = useHandleTextareaInput();
  const handleFileChange = useHandleFileChange(setSelectedFile, setPreview, setFileSize);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [loading, setLoading] = useState(1);
  const { progress, setProgress } = useProgress(loading, setLoading, fileSize);

  const avatarUrl = appwriteService.getAvatars(userData?.name);

  const submit = async (data) => {
    if(data.image[0]){
      setLoading(2);
    }

    setProgress(0);


    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        dispatch(updatePost({ idx, dbPost }));
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      let file;
      if (data.image[0]) {
        file = await appwriteService.uploadFile(data.image[0]);
      }
      if (file !== undefined) {
        const fileId = file.$id;
        data.featuredImage = fileId;
      }
      const dbPost = await appwriteService.createPost({
        ...data,
        userId: userData?.$id,
        username: userData?.name,
        avatar: appwriteService.getAvatars(userData?.name),
      });

      if (dbPost) {
        dispatch(createPost(dbPost));
      }
    }
    setLoading(3);
    reset();
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="w-full  border-y border-teal-800 overflow-y-scroll hide-scrollbar text-white p-5 sm:p-3 lg:p-6 flex">
      <Avatar avatarUrl={avatarUrl} />
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full flex px-3 flex-wrap gap-2 justify-center"
      >
        <PostTextarea
          register={register}
          handleTextareaInput={handleTextareaInput}
        />

        <div className="flex relative h-12 justify-between w-full items-center">
          <FileInput
            register={register}
            handleFileChange={handleFileChange}
            selectedFile={selectedFile}
            preview={preview}
          />

          <Button
            type="submit"
            bgColor={post ? "bg-green-700 hover:bg-green-600" : undefined}
            className="w-fit h-fit py-1 px-4 rounded-full text-center"
          >
            {post ? "Update" : "Post"}
          </Button>
        </div>

        {loading === 2 && (
          <ProgressBarComponent
            progress={progress}
            selectedFile={selectedFile}
            preview={preview}
          />
        )}

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default PostForm;
