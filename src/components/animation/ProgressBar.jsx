// ProgressBar.js
import React from 'react';

const ProgressBar = ({classname=""}) => {
  return (
    <div className={`${classname} w-full h-2 bg-black rounded-lg overflow-hidden relative`}>
      <div
        className={`h-full rounded-lg transition-all duration-100 ease-linear $? uncertain`}
        style={{
          background: 'linear-gradient(90deg, #000000, #0d0d0d, #1a1a1a, #262626, #333333, #404040, #4d4d4d, #595959, #666666, #737373, #808080, #8c8c8c, #999999, #a6a6a6, #b3b3b3, #bfbfbf, #cccccc, #d9d9d9, #e6e6e6, #f2f2f2, #ffffff)',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
