import React from 'react';

function Avatar({ avatarUrl }) {
  return (
    <div>
      <img className="w-9 h-9 md:w-10 md:h-10 rounded-full mr-1" src={avatarUrl} alt="User Avatar" />
    </div>
  );
}

export default Avatar;
