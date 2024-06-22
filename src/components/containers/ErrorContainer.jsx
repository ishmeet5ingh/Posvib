import React from "react";
import {FaExclamationTriangle} from "react-icons/fa";


function ErrorContainer({ children }) {
  return (
    <div className="text-teal-300  text-xs w-64 rounded-md text-start px-2">
    <div className="flex gap-1">
    <div className="flex pt-[1px]">
    <FaExclamationTriangle/> 
    </div>
    <div className="flex">
     {children}
    </div>
    </div>
    </div>
  );
}

export default ErrorContainer;
