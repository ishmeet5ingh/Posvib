import { useForm } from "react-hook-form";

const useFormInitialization = (post) => {
  const { register, handleSubmit, watch, setValue, getValues, reset } = useForm({
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
