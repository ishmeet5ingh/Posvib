// ProgressBar.js
import React from 'react';

const ProgressBar = ({ progress, indeterminate }) => {
  return (
    <div className="progress-bar-container">
      <div
        className={`progress-bar ${indeterminate ? 'indeterminate' : ''}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
