import React from "react";

function ErrorContainer({ children }) {
  return (
    <p className="text-red-800 font text-[13px] textStroke w-60 rounded-md text-start  px-2 mb-2">
      * {children}
    </p>
  );
}

export default ErrorContainer;
