import React, { useEffect, useState, useRef } from "react";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCircle, FaHeart } from "react-icons/fa";
import { Button, LikeFeature, PostCardSkeletonLoading } from "../components";
import { deletePost } from "../store/configSlice";
import { deleteUserPost } from "../store/userSlice";

function PostCard({
  $id,
  content,
  featuredImage = undefined,
  userId,
  $createdAt,
  creator,
  likes
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("creator.name", creator.name)

  const [name, setName] = useState("");
  const currentUserData = useSelector((state) => state.users.currentUser);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const isAuthor = $id && currentUserData ? userId === currentUserData.$id : false;
  const dropdownRef = useRef(null);
  const [imageLoading, setImageLoading] = useState(true); // State for image loading

  function calculateHoursElapsed($createdAt) {
    const startDate = new Date($createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;
    const [loader, setLoader] = useState(false);

    if (timeDifference >= 3600000) {
      return `${Math.floor(timeDifference / (1000 * 60 * 60))} h`;
    } else if (timeDifference < 3600000 && timeDifference >= 60000) {
      return `${Math.floor(timeDifference / (1000 * 60))} m `;
    } else {
      return `${Math.floor(Math.abs(timeDifference / 1000))} s`;
    }
  }

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
    dispatch(deletePost($id))
    dispatch(deleteUserPost({userId: currentUserData?.$id, postId: $id}))
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
            <img className="w-9 h-9 md:w-10 md:h-10 rounded-full" src={creator?.imageUrl} alt="" />
          </div>
          <div>
          <div className="flex gap-2 font-medium items-center">
          <p className="font-medium text-sm md:text-base text-white">{creator?.name}</p>
           <p className="text-teal-600 text-xs">{`${calculateHoursElapsed(
             $createdAt
          )}`}</p>
          </div>
          <p className="text-gray-400 text-sm md:text-sm">@{creator?.username}</p>

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
        {featuredImage !== null ? (
          <Link to={`/post/${$id}`}>
            <div className="relative rounded-md justify-center mb-3">
              <img
                src={appwriteService.getFilePreview(featuredImage)}
                alt={content}
                className={`w-full rounded-md border border-teal-900 `}
                onLoad={() => setImageLoading(false)}
              />
            </div>
          </Link>
        ) : null}
        <LikeFeature likes={likes} postId={$id} currentUserData={currentUserData} />
      </div>
    </div>
  );
}

export default PostCard;

// {imageLoading && <ProgressBar/>} {/* progress bar */}
// <div className={`${
//             imageLoading ? 'hidden' : 'block'
//           }`}>
// </div>
