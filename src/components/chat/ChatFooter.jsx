import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaImage, FaPaperPlane, FaPlane, FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import messageService from "../../appwrite/message";
import chatRoomService from "../../appwrite/chatRoom";
import conf from "../../conf/conf";
import { useDispatch } from "react-redux";
import { addReduxMessage, deleteReduxMessage } from "../../store/chatRoomSlice";

function ChatFooter({username, chatRoomId, senderId, receiverId }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: "",
      fileId: "",
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = messageService.client.subscribe(
      [
        `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteMessagesCollectionId}.documents`,
        "files",
      ],
      (response) => {
        console.log(response);

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          dispatch(
            addReduxMessage({
              chatRoomId: response.payload?.chatRoomId,
              message: response.payload,
            })
          );
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          dispatch(
            deleteReduxMessage({
              chatRoomId: response.payload?.chatRoomId,
              messageId: response.payload?.$id,
            })
          );
          console.log(response);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const submit = async (data) => {
    setSelectedImage(null)
    if(data.message || data.file[0]){
      const tempId = uuidv4();
      const newMessage = {
        $id: tempId,
        chatRoomId,
        senderId,
        receiverId,
        message: data?.message,
        imageUrl: data?.file[0] ? URL.createObjectURL(data?.file[0]) : "",
        $createdAt: new Date().toISOString(),
      };
      const dataFile = data.file[0]
      dispatch(addReduxMessage({ chatRoomId, message: newMessage }));
      reset()
      let file;
      if (dataFile) {
        file = await messageService.uploadAppwriteFile(dataFile);
      }
      const message = await messageService.createAppriteMessage(tempId, {
        ...newMessage,
        fileId: file?.$id,
      });
  
      await chatRoomService.createAppwriteMessageInsideChatRoom(
        senderId,
        receiverId,
        tempId
      );
    }
 
  };

  return (
    <div className="fixed bg-black sm:bg-transparent z-20 sm:sticky bottom-0 right-0 px-2 pb-2 w-full">
      <form onSubmit={handleSubmit(submit)}>
        {selectedImage && (
          
          <div className="w-full p-10 mb-3 h-screen flex flex-col justify-center items-center bg-black absolute right-0 bottom-0 -z-10">
          <div className="w-full">
          <div onClick={() => setSelectedImage(null)} className="w-fit border p-2 rounded-full absolute top-24">
          <FaTimes/>
          </div>
          </div>
          <img
            className="object-cover pb-5 w-[90%] lg:w-[80%]"
            src={selectedImage}
            alt="Selected"
          />
          </div>
        )}
        <div className={`bg-[#222121] rounded-full flex items-center pr-3 xmd:pr-5 ${selectedImage && ""}`}>
          <input
            type="text"
            placeholder={selectedImage && "Add a caption..."}
            className="text-white text-sm p-3 focus:outline-none rounded-md bg-[#222121] rounded-l-full w-full"
            {...register("message", { required: false })}
          />

          <div className="flex gap-4 xmd:gap-8">
            <input
              type="file"
              className="hidden"
              id="chatImage"
              {...register("file", { required: false })}
              onInput={handleFileChange}
            />
            <label htmlFor="chatImage" className="cursor-pointer hover:text-blue-400 transition-all duration-200">
              <FaImage size={20} />
            </label>
            <button type="submit"
            className={`${selectedImage && "absolute bottom-16 bg-green-700  p-2 rounded-full right-4"}`}>
              <FaPaperPlane size={`${selectedImage ? 22 : 18}`} />
            </button>
            <div className={`${selectedImage ? "w-fit bg-[#292929] py-1 px-4 border border-teal-800 rounded-full ml-4 flex items-center gap-2 absolute left-0 bottom-16" : "hidden" }`}>{username}</div>
          </div>
        </div>
       
      </form>
    </div>
  );
}

export default ChatFooter;
