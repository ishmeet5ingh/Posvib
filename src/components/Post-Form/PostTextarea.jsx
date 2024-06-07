import React from 'react';

function PostTextarea({ register, handleTextareaInput }) {
  return (
    <div className="flex w-full flex-col">
      <textarea
        {...register("content", { required: true })}
        className="hide-scrollbar w-full border-b border-teal-800 outline-none text-white resize-none bg-black"
        placeholder="Lets Post . . ."
        onInput={handleTextareaInput}
      ></textarea>
    </div>
  );
}

export default PostTextarea;
