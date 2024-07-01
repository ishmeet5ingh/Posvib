import React, { useState, useEffect, useRef } from "react";
import appwriteService from "../../appwrite/config";
import avatarPlaceholder from "../../../public/avatarPlaceholder.jpeg";
import {
  Avatar,
  ProgressBarComponent,
  FileInput,
  PostTextarea,
  Button,
} from "..";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReduxPost, updateReduxPost } from "../../store/configSlice";
import {
  useHandleFileChange,
  useHandleTextareaInput,
  useFormInitialization,
  useProgress,
} from "../../hooks";
import { setReduxUserPost, updateReduxUserPost } from "../../store/userSlice";
import PostFormSkeletonLoader from "../SkeletonLoading/PostFormSkeletonLoader";
import conf from "../../conf/conf";

function PostForm({ post }) {
  const { register, handleSubmit, getValues, reset, setContent } =
    useFormInitialization(post);

  // State variables
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [createdPost, setCreatedPost] = useState("");
  const isCreating = useRef(false); // Ref to flag post creation

  // Custom hooks for handling textarea input and file change
  const handleTextareaInput = useHandleTextareaInput();
  const handleFileChange = useHandleFileChange(
    setSelectedFile,
    setPreview,
    setFileSize
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.currentUser);
  const posts = useSelector((state) => state.config.posts);
  const [loading, setLoading] = useState(1);
  const { progress, setProgress } = useProgress(loading, setLoading, fileSize);
  const [postFeaturedImage, setPostFeaturedImage] = useState(post?.featuredImage);

  useEffect(() => {
    const unsubscribe = appwriteService.client.subscribe(
      [
        `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents`,
        "files"
      ],
      (response) => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          if (!isCreating.current) {
            dispatch(createReduxPost(response.payload)); // Dispatch action to create new post in Redux store
            dispatch(setReduxUserPost(response.payload)); // Set user's new post in Redux store
          }
        }

        if (response.events.includes("databases.*.collections.*.documents.*.update")) {
          dispatch(updateReduxPost({ id: response.payload.$id, dbPost: response.payload })); // Dispatch action to update post in Redux store
          dispatch(updateReduxUserPost(response.payload)); // Update user's post in Redux store
          setContent(response.payload?.content);
          if (response.payload?.featuredImage) setPostFeaturedImage(response.payload?.featuredImage);
        }
      }
    );

    return () => {
      unsubscribe();
    }
  }, [dispatch]);

  const submit = async (data) => {
    if (data.image[0]) {
      setLoading(2);
    }

    setProgress(0); // Initialize progress to 0%
    isCreating.current = true; // Set flag to indicate post creation in progress

    if (post) {
      // Existing post update logic
      const file = data.image[0] ? await appwriteService.uploadAppwriteFile(data.image[0]) : null;
      if (file) {
        appwriteService.deleteAppwriteFile(post.featuredImage); // Delete previous file if new file uploaded
      }
      const dbPost = await appwriteService.updateAppwritePost(post?.$id, {
        ...data,
        featuredImage: file ? file?.$id : undefined,
      });
    } else {
      // New post creation logic
      let file;
      if (data.image[0]) {
        file = await appwriteService.uploadAppwriteFile(data.image[0]); // Upload new file if provided 
      }
      if (file !== undefined) {
        data.featuredImage = file?.$id;
      }
      const dbPost = await appwriteService.createAppwritePost({
        ...data,
        userId: userData?.$id,
      });
      if (dbPost) {
        // Update Redux store immediately
        dispatch(createReduxPost(dbPost));
        dispatch(setReduxUserPost(dbPost));
      }
      setCreatedPost(dbPost?.$id);
    }

    isCreating.current = false; // Reset flag after post creation
    setLoading(3); // submission completed
    reset(); // Reset form values
    setSelectedFile(null); // Clear selected file
    setPreview(null); // Clear file preview
  };

  return (
    <div className="w-full  border-y border-teal-800 overflow-y-scroll hide-scrollbar text-white p-5 sm:p-3 lg:p-6 flex">
      {!posts ? (
        <PostFormSkeletonLoader />
      ) : (
        <>
          <Avatar
            avatarUrl={
              !userData?.imageUrl ? avatarPlaceholder : userData?.imageUrl
            }
          />
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
                setSelectedFile={setSelectedFile}
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

            {post && post.featuredImage && (
              <div className="w-full mb-4">
                <img
                  src={appwriteService.getFilePreview(postFeaturedImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default PostForm;
