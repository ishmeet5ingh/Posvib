import React from 'react';

function Avatar({ avatarUrl }) {
  return (
    <div>
      <img className="max-w-9 max-h-9 md:max-w-10 md:max-h-10 rounded-full" src={avatarUrl} alt="User Avatar" />
    </div>
  );
}

export default Avatar;
