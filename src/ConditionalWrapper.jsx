import React from "react";
import { EditPost } from "./pages";

const ConditionalWrapper = ({ children }) => {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (child.type !== EditPost) {
          return child; // Don't wrap EditPost
        }
        return <div className="custom-wrapper">{child}</div> // Wrap others
      })}
    </>
  );
};

export default ConditionalWrapper;
