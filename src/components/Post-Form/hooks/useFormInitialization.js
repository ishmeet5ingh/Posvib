import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useFormInitialization = (post, slugTransform) => {
  const { register, handleSubmit, watch, setValue, getValues, reset } = useForm({
    defaultValues: {
      content: post?.content || "",
      slug: post?.$id || "",
      status: post?.status || "active",
      username: post?.username || "",
      avatar: post?.avatar || "",
    },
  });

  useEffect(() => {
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
  return { register, handleSubmit, getValues, reset };
};

export default useFormInitialization;
