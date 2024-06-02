import React, { useEffect, useState , useRef} from "react";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { FaCircle } from "react-icons/fa";
import { Button, ProgressBar } from "../components";
import {deletePost} from "../store/configSlice"


// import authUsers from "../appwrite/users";

function PostCard({
  $id,
  content,
  featuredImage = undefined,
  userId,
  username,
  avatar,
  $createdAt,
  idx
}) {


  const navigate = useNavigate()
  const [name, setName] = useState("");
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch()
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const isAuthor = $id && userData ? userId === userData.$id : false;
  const avatarUrl = appwriteService.getAvatars();
  const dropdownRef = useRef(null);
  const [imageLoading, setImageLoading] = useState(true); // State for image loading


  function calculateHoursElapsed($createdAt) {
    const startDate = new Date($createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;
    const [loader, setLoader] = useState(false)
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const delpost = async () => {
    dispatch(deletePost(idx))
    await appwriteService.deletePost($id)
    if(featuredImage!==null){
      await appwriteService.deleteFile(featuredImage)
    }
    navigate("/")
  };







  return (
    <div className="border relative  border-x-0 border-b-0 border-teal-800 flex p-5 sm:p-3 lg:p-6 flex-col">
      <div className="flex gap-2">
        <img className="w-9 h-9 rounded-[50%]" src={avatar} alt="" />
        <div className="w-full">
          <div className="flex w-full justify-between">
            <div className="flex w-full gap-2 text-sm">
              <h3 className="text-white">{username}</h3>
              <p className="text-teal-600">{`${calculateHoursElapsed(
                $createdAt
              )}`}</p>
            </div>
            <div className="relative flex items-center" ref={dropdownRef}>
              <div
                className="flex px-1 py-2 duration-200 rounded-full  hover:bg-blue-400 hover:text-black text-teal-400"
                onClick={toggleDropdown}
              >
                <FaCircle size={5} className="mr-1" />
                <FaCircle size={5} className="mr-1" />
                <FaCircle size={5} />
              </div>

              {dropdownVisible && (
                <div className=" absolute top-6 right-0 z-10 bg-black border text-white border-teal-500 rounded shadow">
                  {/* Dropdown content goes here */}
                  {isAuthor ? (
                    <ul className="w-full">
                      <li>
                        <Link to={`/edit-post/${$id}`} className="">
                          <Button
                          children="Edit"
                            bgColor=""
                            className="text-sm px-4 py-2 border-b w-full border-teal-500"
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
        </div>
      </div>
      <Link  to={`/post/${$id}`}>

          <div className="pl-12 ">
            <h2 className="text-sm pb-2 text-white">{content}</h2>
            {featuredImage !== null ? (
              <div className="relative  justify-center mb-4">
              
                <img
                  width=""
                  src={appwriteService.getFilePreview(featuredImage)}
                  alt={content}
                  className={`rounded-xl sm:w-full w-5/6 border border-teal-800 `}
                  onLoad={() => setImageLoading(false)} 
                />
              </div>
            ) : null}
          </div>
      </Link>
    </div>
  );
}

export default PostCard;

// {imageLoading && <ProgressBar/>} {/* progress bar */}
// <div className={`${
//             imageLoading ? 'hidden' : 'block'
//           }`}>
// </div>