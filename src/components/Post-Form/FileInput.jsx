import React from 'react';
import { FaImage } from 'react-icons/fa';

function FileInput({ register, handleFileChange, selectedFile, preview }) {
  return (
    <div className="flex gap-2">
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
        <div className="flex items-center space-x-4 p-2">
          <span className="text-gray-500 text-xs">{selectedFile}</span>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-6 h-6 object-cover rounded"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default FileInput;
