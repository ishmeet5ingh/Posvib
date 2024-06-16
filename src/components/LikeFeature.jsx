import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import likeIcon from "../../public/like.svg"
import likedIcon from '../../public/liked.svg'
import { useDispatch, useSelector } from 'react-redux'
import { updateLike } from '../store/configSlice'
import conf from '../conf/conf'

function LikeFeature({ likes = [], postId, currentUserData }) {
    const [isLiked, setIsLiked] = useState(likes.some(likedUser => likedUser === currentUserData?.$id) || false)
    const [likeCount, setLikeCount] = useState(likes.length)

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = appwriteService.client.subscribe(
            `databases.${conf.appwriteDatabaseId}.collections.${conf.appwritePostsCollectionId}.documents`,
            response => {
              console.log(response)
                if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                    const updatedLikes = response.payload.likes;
                    setLikeCount(updatedLikes.length);
                    setIsLiked(updatedLikes.includes(currentUserData?.$id));
                    console.log("updatedLikes", updatedLikes)
                    dispatch(updateLike({ id: postId, likesArray: updatedLikes }));
                }
            }
        );

        return () => {
          unsubscribe();
        };
    }, []);

    const handleLike = async () => {
      // setIsLiked(prevLiked => !prevLiked);
      // setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1)
        try {
            const updatedDocument = await appwriteService.likePost(postId, currentUserData?.$id);
            // dispatch(updateLike({ id: postId, likesArray: updatedDocument.likes }));

            // Update the local state after the async operation to reflect the latest state
            // setLikeCount(updatedDocument.likes.length);
            // setIsLiked(updatedDocument.likes.includes(currentUserData?.$id));
        } catch (error) {
            // setIsLiked(prevLiked => !prevLiked);
            // setLikeCount(prevCount => isLiked ? prevCount + 1 : prevCount - 1)
            console.error('Error updating like status:', error.message);
        }
    };

    return (
        <div className="flex justify-between px-4 sm:px-5 items-center">
            <div className="flex gap-1 mr-5 items-center">
                <img 
                    className="cursor-pointer"
                    src={isLiked ? likeIcon : likedIcon} 
                    alt="like"
                    width={25}
                    height={25}
                    onClick={handleLike}
                />
                <p className="text-white">{likeCount}</p>
            </div>
        </div>
    )
}

export default LikeFeature
