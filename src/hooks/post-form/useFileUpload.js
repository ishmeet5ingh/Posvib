import appwriteService from "../../appwrite/config";

const useFileUpload = () => {
  const uploadFile = async (file) => {
    if (file) {
      return await appwriteService.uploadFile(file);
    }
    return null;
  };

  const deleteFile = async (fileId) => {
    if (fileId) {
      await appwriteService.deleteFile(fileId);
    }
  };

  return { uploadFile, deleteFile };
};

export default useFileUpload;
