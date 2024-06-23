// BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa'

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className=" text-white  py-5 rounded-lg"
    >
     <FaArrowLeft/>
    </button>
  );
};

export default BackButton;
