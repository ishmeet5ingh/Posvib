
import React, { useEffect, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const InfoMessage = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(()=> {
    setShow((message === `Password must contain at least one lowercase letter, and one number.`) ? true : false)
  }, [])

  return (
    <div className="text-gray-400 mb-1 relative">
      <div >
        <FaInfoCircle onClick={() => setShow((prev) => !prev)} style={{ marginTop: '3px' }} />
      </div>
      {show && (
        <p className="text-xs top-0 left-5 absolute flex gap-1">
          {message}
        </p>
      )}
    </div>
  );
};

export default InfoMessage;
