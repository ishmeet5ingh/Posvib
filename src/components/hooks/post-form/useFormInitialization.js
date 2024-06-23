import { useForm } from "react-hook-form";

// Custom hook for form initialization with react-hook-form
const useFormInitialization = (post) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      content: post?.content || "",  
      status: post?.status || "active",
      username: post?.username || "", 
      avatar: post?.avatar || "",    
    },
  });

  return { register, handleSubmit, getValues, reset };
};

export default useFormInitialization;
