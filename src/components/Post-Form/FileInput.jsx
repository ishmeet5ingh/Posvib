import React, {useState} from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';

function FileInput({ register, handleFileChange, selectedFile, preview, setSelectedFile }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleRemoveFile = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedFile(null);
      setIsVisible(true);
    }, 200);
  };
  return (
    <div className="flex">
      <input
        type="file"
        id="fileInput"
        {...register("image", { required: false })}
        className="hidden"
        onInput={handleFileChange}
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer text-white rounded flex items-center "
      >
        <FaImage className="w-8 h-8 text-blue-500 hover:text-blue-600" />
      </label>
      {selectedFile && (
        <div  className={`flex border border-teal-700 rounded-md items-center m-2 py-2 px-1 gap-2 relative transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={handleRemoveFile}
          className='absolute -right-1 text-sm -top-1 border text-gray-400 border-teal-500 rounded-full'
        >
          <FaTimes />
        </button>
          <span className="text-gray-500 text-xs">{selectedFile}</span>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-9 object-cover rounded"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default FileInput;
