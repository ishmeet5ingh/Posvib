const useHandleFileChange = (setSelectedFile, setPreview, setFileSize) => {
  return (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;

      const lastDotIndex = fileName.lastIndexOf(".");
      const fileNameWithoutExtension = fileName.slice(0, lastDotIndex);
      const fileExtension = fileName.slice(lastDotIndex);
      const finalFileName =
        fileNameWithoutExtension.length > 12
          ? `${fileNameWithoutExtension.slice(0, 12)}..${fileExtension}`
          : fileName;

      setSelectedFile(finalFileName);

      // Get file size
      const fileSizeInBytes = file.size;
      const fileSizeInKB = Math.floor((fileSizeInBytes / 1024).toFixed(2))
      setFileSize(`${fileSizeInKB}`);


      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    
      
    }
  };
};

export default useHandleFileChange;
