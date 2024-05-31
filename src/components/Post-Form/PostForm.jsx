import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, ProgressBar, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaImage } from "react-icons/fa";
import { FaUpload } from "react-icons/fa"
import {createPost, updatePost} from '../../store/configSlice'


function PostForm({ post, idx}) {
  const { register, handleSubmit, watch, setValue, getValues, reset } = useForm({
    defaultValues: {
      content: post?.content || "",
      slug: post?.$id || "",
      status: post?.status || "active",
      username: post?.username || "",
      avatar: post?.avatar || ""
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(1)

  const avatarUrl = appwriteService.getAvatars(userData?.name)

  
  const submit = async (data) => {
    setLoading(2)
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
        dispatch(updatePost({idx, dbPost}))
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
        avatar: appwriteService.getAvatars(userData?.name)
      });
    
      
      
      if (dbPost) {
        dispatch(createPost(dbPost))
        // navigate(`/post/${dbPost.$id}`);
      }
    }
    setLoading(3)
    reset();
    setSelectedFile(null);
    setPreview(null);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      const transformedString = value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

      // Split the transformed string into an array of words
      const words = transformedString.split("-");

      // Extract the first and last words
      const firstWord = words[0];
      const lastWord = words[words.length - 1];

      if (words.length > 1) {
        return `${firstWord}..${words.length}-words..${lastWord}`;
      } else {
        return `${firstWord}`;
      }
    }
  }, []);

  React.useEffect(() => {
    // sets up a subscription using the watch function,
    const subscription = watch((value, { name }) => {
      // value is watchObserver
      if (name === "content") {
        setValue("slug", slugTransform(value.content), {
          shouldValidate: true,
        });
      }
      // --> The watch function takes a callback function that will be executed whenever a watched value changes.

      // --> when type something in content slug value changes so watch watches the content value and make changes in the slug

      // --> If the change occurred in the "content" field, this line updates the value of another field called "slug".

      // --> It uses the slugTransform function to transform the content value into a slug format, which is then set as the new value of the "slug" field.

      // --> The { shouldValidate: true } option indicates that validation should be performed on the "slug" field after updating its value.
    });

    return () => subscription.unsubscribe();

    // return () => subscription.unsubscribe();

    //The useEffect hook returns a cleanup function that unsubscribes the subscription when the component unmounts.

    //This cleanup function ensures that the subscription is removed to avoid memory leaks and unnecessary updates after the component is no longer in use.
  }, [watch, slugTransform, setValue]);


  const handleTextareaInput = (e) => {
    e.target.style.height = "auto"; //reset
    e.target.style.height = `${e.target.scrollHeight}px`;
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;

    const lastDotIndex = fileName.lastIndexOf('.');
    const fileNameWithoutExtension = fileName.slice(0, lastDotIndex);
    const fileExtension = fileName.slice(lastDotIndex);
    const finalFileName = fileNameWithoutExtension.length > 12
    ? `${fileNameWithoutExtension.slice(0, 12)}..${fileExtension}`
    : fileName;
      
    setSelectedFile(finalFileName);
      const reader = new FileReader();
      //  The FileReader API provides methods to read the contents of File objects asynchronously.

      console.log("reader", reader)

      reader.onloadend = () => {
        setPreview(reader.result);
        console.log("reader.result", reader.result)
      };
      reader.readAsDataURL(file);

      console.log("reader.readAsDataUrl", reader.readAsDataURL(file))

    }
  };


  return (
    <div className="w-full border-t border-teal-800  overflow-y-scroll hide-scrollbar text-white p-5 sm:p-3 lg:p-6 flex">
      <div>
        <img
          className="max-w-9 max-h-9 rounded-full"
          src={avatarUrl}
          alt=""
        />
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full flex px-3 flex-wrap gap-2 justify-center"
      >
        <div className="flex w-full flex-col">
          <textarea
            {...register("content", { required: true })}
            className={`hide-scrollbar w-full  border-b border-teal-800  outline-none text-white resize-none  bg-black`}
            placeholder="Lets Post . . ."
            onInput={handleTextareaInput}
          ></textarea>
        </div>

      <div className="flex relative  h-12 justify-between w-full  items-center">
      <div className="flex gap-2">
        <input
        type="file"
        id="fileInput"
        {...register("image", { required: false })}
        className="hidden"
        onInput={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer text-white rounded flex items-center "
      >
        <FaImage className="w-8 h-8 text-blue-500 hover:text-blue-600" />
        
      </label>
      {selectedFile && (
        <div className="flex items-center space-x-4  p-2">
          <span className="text-gray-500 text-xs">{selectedFile}</span>
          {preview && (
            <img src={preview} 
            alt="Preview" 
            className="w-6 h-6 object-cover rounded" />
          )}
          
        </div>
      )}
      </div>
          

          <Button
            type="submit"
            bgColor={post ? "bg-green-700 hover:bg-green-600" : undefined}
            className="w-fit h-fit py-1 px-4 rounded-full text-center"
          >
            {post ? "Update" : "post"}
          </Button> 
        </div>
        {loading === 2 &&  
          <ProgressBar progress={0} indeterminate={true} />}
        
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
