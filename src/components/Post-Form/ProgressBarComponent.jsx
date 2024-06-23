import React from "react";

function ProgressBarComponent({ progress, selectedFile, preview }) {
  return (
    <div className="w-full flex items-start gap-2">
      {/* Selected File */}
      {" " && (
        <div className="flex items-center space-x-4 ">
          <span className="text-blue-200 text-xs text-start">
            {selectedFile}
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-3/4 pr-2">
        <div
          style={{
            background: "gray",
            border: "1px solid #000",
            width: "100%",
            height: "10px",
            borderRadius: "20px",
          }}
        >
          <div
            className="text-center"
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#345DF7",
              transition: "width 0.5s ease",
              borderRadius: "20px",
            }}
          ></div>
        </div>

        {/* Progress Percentage and Loading Dots */}
        <div className="flex gap-2 ">
          <h3 className="text-white text-xs">{progress}%</h3>
          {/* Display loading dots when progress is complete */}
          {!(progress < 100) && (
            <div className="loading-dots">
              <h3 className="text-xs">finishing up</h3>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressBarComponent;
