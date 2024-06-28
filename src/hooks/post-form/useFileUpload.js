import appwriteService from "../../appwrite/config";

const useFileUpload = () => {
  const uploadFile = async (file) => {
    if (file) {
      return await appwriteService.uploadAppwriteFile(file);
    }
    return null;
  };

  const deleteFile = async (fileId) => {
    if (fileId) {
      await appwriteService.deleteAppwriteFile(fileId);
    }
  };

  return { uploadFile, deleteFile };
};

export default useFileUpload;
