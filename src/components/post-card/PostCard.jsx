import React, { useEffect, useState, useRef } from "react";
import appwriteService from "../../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCircle, FaHeart } from "react-icons/fa";
import { Button, LikeFeature, CommentFeature, PostCardFooter } from "..";
import { deletePost } from "../../store/configSlice";
import { deleteUserPost } from "../../store/userSlice";
import placeholderImage from "../../../public/avatarPlaceholder.jpeg";
import { useElapsedTime } from "../../hooks";
import conf from "../../conf/conf";

function PostCard({
  $id,
  content,
  featuredImage = undefined,
  userId,
  $createdAt,
  creator,
  likes,
  comments,
}) {
  // state Variables
  const [name, setName] = useState("");
  const currentUser = useSelector((state) => state.users.currentUser);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [imageLoading, setImageLoading] = useState(true); // State for image loading
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthor =
    $id && currentUser ? userId === currentUser?.$id : false;
      
  useEffect(() => {
    const unsubscribe = appwriteService.client.subscribe(
      [
        `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents.${$id}`,
        "files",
      ],
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          dispatch(deletePost(response.payload.$id));
          dispatch(
            deleteUserPost({
              userId: response.payload?.userId,
              postId: response.payload?.$id,
            })
          );
        }
      }
    );
    return () => {
      unsubscribe();
    };
  });

  // calculating Elapsed Time
  const elapsedTime = useElapsedTime($createdAt);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const delpost = async () => {
    await appwriteService.deletePost($id);
    if (featuredImage !== null) {
      await appwriteService.deleteFile(featuredImage);
    }
  };

  return (
    <div className="relative border-b border-teal-800 flex p-4 flex-col">
      <div className=" w-full">
        <div className="w-full mb-2 flex justify-between">
          <Link className="flex gap-2 pb-1" to={`/user/${creator.username}`}>
            <div className="pt-1">
              <img
                className="w-9 h-9 md:w-10 md:h-10 rounded-full"
                src={creator?.imageUrl}
                alt=""
              />
            </div>
            <div>
              <div className="flex gap-2 font-medium items-center">
                <p className="font-medium text-sm md:text-base text-white">
                  {creator?.name}
                </p>
                <p className="text-teal-600 text-xs">{`${elapsedTime}`}</p>
              </div>
              <p className="text-gray-400 text-sm md:text-sm">
                @{creator?.username}
              </p>
            </div>
          </Link>
          <div className="relative flex items-center" ref={dropdownRef}>
            <div
              className="flex px-1 py-2 duration-200 rounded-full  text-teal-400"
              onClick={toggleDropdown}
            >
              <FaCircle size={5} className="mr-1" />
              <FaCircle size={5} className="mr-1" />
              <FaCircle size={5} />
            </div>

            {dropdownVisible && (
              <div className=" absolute top-6 right-0 z-10 bg-[#0f0f0f] border text-white border-zinc-800 rounded shadow">
                {/* Dropdown content goes here */}
                {isAuthor ? (
                  <ul className="w-full">
                    <li>
                      <Link to={`/edit-post/${$id}`} className="">
                        <Button
                          children="Edit"
                          bgColor=""
                          className="text-sm px-4 py-2 border-b w-full border-zinc-800"
                        />
                      </Link>
                    </li>
                    <li>
                      <Button
                        children="Delete"
                        bgColor=""
                        onClick={delpost}
                        className="text-sm px-4 py-2"
                      />
                    </li>
                  </ul>
                ) : (
                  <p className="px-4 py-2">Not Your Post</p>
                )}
              </div>
            )}
          </div>
        </div>
        <h2 className="text-sm pb-2 text-white">{content}</h2>
      </div>

      <div className="">
        {imageLoading && featuredImage && (
          <div className="relative w-full h-[200px] flex items-center justify-center">
            <img
              src={placeholderImage}
              alt="Loading..."
              className="w-full h-full fit rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
          </div>
        )}{" "}
        {/* progress bar */}
        <div className={`${imageLoading ? "hidden" : "block"}`}>
          {featuredImage !== null ? (
            <Link to={`/post/${$id}`}>
              <div className="relative rounded-md justify-center">
                <img
                  src={appwriteService.getFilePreview(featuredImage)}
                  alt={content}
                  className={`w-full rounded-md border border-teal-900 transition-opacity duration-500 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setImageLoading(false)}
                />
              </div>
            </Link>
          ) : null}
        </div>
        <PostCardFooter
          likes={likes}
          comments={comments}
          postId={$id}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}

export default PostCard;
