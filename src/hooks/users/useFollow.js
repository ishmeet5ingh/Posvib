import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwriteAuthService from "../../appwrite/auth";
import { updateFollowingFollowers } from "../../store/userSlice";
import conf from "../../conf/conf";


const useFollow = (user) => {
  // Redux state selectors
  const currentUserData = useSelector((state) => state.users.currentUser);
  const loading = useSelector((state) => state.loading.isLoading);
  const users = useSelector((state) => state.users.users);

  // Local state for following status and followers count
  const [following, setFollowing] = useState(
    currentUserData?.following?.includes(user?.$id)
  );
  const [followersCount, setFollowersCount] = useState(
    users?.find((targetUser) => targetUser?.$id === user?.$id)?.followers
      ?.length
  );

  const dispatch = useDispatch();

  // Update local state on user or currentUserData change
  useEffect(() => {
    if (user && currentUserData) {
      setFollowing(currentUserData.following?.includes(user.$id));
      setFollowersCount(
        users?.find((targetUser) => targetUser?.$id === user?.$id)?.followers
          ?.length
      );
    }
  }, [user, currentUserData, users]);


  // useEffect(()=>{
  //   const unsubscribe = appwriteAuthService.client.subscribe(
  //     `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteUsersCollectionId}.documents`,
  //    response => {
  //     if(response.payload?.$id === user?.$id){
  //       const payload = response.payload
  //       console.log("followers following realtime", payload);
  //     }
  //   })

  //   return ()=> {
  //     unsubscribe()
  //   }
  // }, [])

  // Handle follow/unfollow action
  const handleFollow = async () => {
    try {
      // update local state
      setFollowing((prev) => !prev);
      setFollowersCount((prevCount) =>
        following ? prevCount - 1 : prevCount + 1
      );

      //update following/followers to server
      await appwriteAuthService.updateFollowingFollowers(
        currentUserData?.$id,
        user?.$id
      );

      // update Redux state
      dispatch(
        updateFollowingFollowers({
          currentUserId: currentUserData?.$id,
          targetUserId: user?.$id,
        })
      );
    } catch (error) {
      // Rollback local state on error
      setFollowing((prev) => !prev);
      setFollowersCount((prevCount) =>
        following ? prevCount + 1 : prevCount - 1
      );
      console.log(error);
    }
  };

  return { following, currentUserData, loading, followersCount, handleFollow };
};

export default useFollow;
