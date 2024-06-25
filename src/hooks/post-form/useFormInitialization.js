import { useState } from "react";
import { useForm } from "react-hook-form";

// Custom hook for form initialization with react-hook-form
const useFormInitialization = (post) => {
  const [content, setContent] = useState(post?.content)
  const {
    register,
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      content: content || "",  
      status: post?.status || "active",
      username: post?.username || "", 
      avatar: post?.avatar || "",    
    },
  });

  return { register, handleSubmit, getValues, reset, setContent};
};

export default useFormInitialization;
