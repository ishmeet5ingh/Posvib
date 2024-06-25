import { createSlice, current } from "@reduxjs/toolkit";

// Utility function to safely parse JSON from localStorage
const parseJSON = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item && item !== "undefined" ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage`, error);
    return null;
  }
};

// Initial state
const initialState = {
  users: parseJSON("users"),
  currentUser: parseJSON("currentUser"),
};

// Create user slice
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Set users in state and localStorage
    setUsers: (state, action) => {
      state.users = action.payload;
      try {
        localStorage.setItem("users", JSON.stringify(state.users));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // Set current user in state and localStorage
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      try {
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      } catch (error) {
        console.error("Error updating currentUser in localStorage", error);
      }
    },

    // Add a post to the user's posts
    setUserPost: (state, action) => {
      const post = action.payload;
      const updatedUsers = state.users?.map((user) =>
        user.$id === post.userId
          ? { ...user, posts: [...(user.posts || []), post] }
          : user
      );
      state.users = updatedUsers;
      try {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // Update a specific user's post
    updateUserPost: (state, action) => {
      const updatedPost = action.payload;
      const updatedUsers = state.users?.map((user) =>
        user.$id === updatedPost.userId
          ? {
              ...user,
              posts: user.posts?.map((post) =>
                post.$id === updatedPost.$id ? updatedPost : post
              ),
            }
          : user
      );
      state.users = updatedUsers;
      try {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // Delete a specific user's post
    deleteUserPost: (state, action) => {
      const { userId, postId } = action.payload;
      const updatedUsers = state.users?.map((user) =>
        user.$id === userId
          ? {
              ...user,
              posts: user?.posts?.filter((post) => post.$id !== postId),
            }
          : user
      );
      state.users = updatedUsers;
      try {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // Update likes on a user's post
    updateUserPostLike: (state, action) => {
      const { userId, postId } = action.payload;
      const updatedUsers = state.users?.map((user) =>
        user.$id === userId
          ? {
              ...user,
              posts: user.posts?.map((post) =>
                post.$id === postId
                  ? {
                      ...post,
                      likes: post?.likes?.includes(userId)
                        ? post?.likes?.filter((id) => id !== userId)
                        : [...post?.likes, userId],
                    }
                  : post
              ),
            }
          : user
      );
      state.users = updatedUsers;
      try {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // Update following and followers lists
    updateFollowingFollowers: (state, action) => {
      const { currentUserId, targetUserId } = action.payload;
      const updatedUsers = state.users
        ?.map((user) =>
          user.$id === currentUserId
            ? {
                ...user,
                following: user.following?.includes(targetUserId)
                  ? user.following?.filter(
                      (targetId) => targetId !== targetUserId
                    )
                  : [...user.following, targetUserId],
              }
            : user
        )
        .map((user) =>
          user.$id === targetUserId
            ? {
                ...user,
                followers: user.followers?.includes(currentUserId)
                  ? user.followers?.filter(
                      (currentId) => currentId !== currentUserId
                    )
                  : [...user.followers, currentUserId],
              }
            : user
        );

      // Update current user following list
      state.currentUser = {
        ...state.currentUser,
        following: state.currentUser.following.includes(targetUserId)
          ? state.currentUser.following?.filter(
              (targetId) => targetId !== targetUserId
            )
          : [...state.currentUser.following, targetUserId],
      };

      state.users = updatedUsers;
      try {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // update comments in user's post
    updateUserPostComment: (state, action) => {
      const { comment, postId, userId } = action.payload;

      const updatedUsers = state.users?.map((user) =>
        user?.$id === userId
          ? {
              ...user,
              posts: user.posts?.map((post) =>
                post?.$id === postId
                  ? { ...post, comments: { ...post.comments, comment } }
                  : post
              ),
            }
          : user
      );
      state.users = updatedUsers;

      try {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // Delete all users
    deleteUsers: (state) => {
      state.users = null;
      try {
        localStorage.setItem("users", JSON.stringify(state.users));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // Delete the current user
    deleteCurrentUser: (state) => {
      state.currentUser = null;
      try {
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      } catch (error) {
        console.error("Error updating currentUser in localStorage", error);
      }
    },
  },
});

// Export actions and reducer
export const {
  setUsers,
  setCurrentUser,
  setUserPost,
  updateUserPost,
  deleteUserPost,
  deleteUsers,
  deleteCurrentUser,
  updateUserPostLike,
  updateFollowingFollowers,
  updateUserPostComment,
} = userSlice.actions;

export default userSlice.reducer;
