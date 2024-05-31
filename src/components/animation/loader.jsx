import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative animated w-16 h-16">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 bg-gray-500 rounded-full`}
            style={{
              animation: 'yt-spin 1.2s linear infinite',
              animationDelay: `${(i * 0.15)}s`,
              transformOrigin: '32px 32px',
              transform: `rotate(${i * 45}deg) translate(28px)`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;