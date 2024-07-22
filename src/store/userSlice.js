
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
    setReduxUsers: (state, action) => {
      state.users = action.payload;
      try {
        localStorage.setItem("users", JSON.stringify(state.users));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    updateReduxUser: (state, action)=> {
      const {userId, updatedField} = action.payload
      state.users = state.users?.map(user => user?.$id===userId ? {...user, ...updatedField} : user)
      try {
        localStorage.setItem("users", JSON.stringify(state.users));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // add new user
    addReduxUser: (state, action) => {
       state.users.push(action.payload)
       try {
        localStorage.setItem("users", JSON.stringify(state.users));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    }, 

    // Set current user in state and localStorage
    setReduxCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      try {
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      } catch (error) {
        console.error("Error updating currentUser in localStorage", error);
      }
    },

    updateReduxCurrentUser: (state, action) => {
      const updatedField = action.payload
      state.currentUser = {...state.currentUser, ...updatedField}
      
      try {
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
      } catch (error) {
        console.error("Error updating currentUser in localStorage", error);
      }
    },

    // Add a post to the user's posts
    setReduxUserPost: (state, action) => {
      const post = action.payload;
      const updatedUsers = state.users?.map((user) =>
        user.$id === post.userId
          ? { ...user, posts: [post, ...user.posts] }
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
    updateReduxUserPost: (state, action) => {
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
    deleteReduxUserPost: (state, action) => {
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

    // update like of post which is inside the user 
    updateReduxUserPostLike: (state, action) => {
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

    // update like of comment which is inside the user 
    updateReduxUserCommentLike: (state, action) => {
      const { userId, postId, commentId } = action.payload;
      const updatedUsers = state.users?.map((user) =>
        user.$id === userId
          ? {
              ...user,
              posts: user.posts?.map((post) =>
                post?.$id === postId
                  ? {
                      ...post,
                      comments: post.comments.map((comment) =>
                        comment?.$id === commentId
                          ? {
                              ...comment,
                              likes: comment?.likes?.includes(userId)
                                ? comment?.likes?.filter((id) => id !== userId)
                                : [...comment?.likes, userId],
                            }
                          : comment
                      ),
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

    // update like of reply which is inside the user 
    updateReduxUserReplyLike: (state, action) => {
      const { userId, postId, commentId, replyId } = action.payload;
      const updatedUsers = state.users?.map((user) =>
        user.$id === userId
          ? {
              ...user,
              posts: user.posts?.map((post) =>
                post?.$id === postId
                  ? {
                      ...post,
                      comments: post.comments.map((comment) =>
                        comment?.$id === commentId
                          ? {
                              ...comment,
                              replies: comment.replies?.map((reply) =>
                                reply?.$id === replyId
                                  ? {
                                      ...reply,
                                      likes: reply?.likes?.includes(userId)
                                        ? reply?.likes?.filter(
                                            (id) => id !== userId
                                          )
                                        : [...reply?.likes, userId],
                                    }
                                  : reply
                              ),
                            }
                          : comment
                      ),
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
    updateReduxFollowingFollowers: (state, action) => {
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
    addReduxUserPostComment: (state, action) => {
      const { comment, postId, userId } = action.payload;

      const updatedUsers = state.users?.map((user) =>
        user?.$id === userId
          ? {
              ...user,
              posts: user.posts?.map((post) =>
                post?.$id === postId
                  ? { ...post, comments: [comment, ...post.comments] }
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

    addReduxUserCommentReply: (state, action) => {
      const { reply, commentId, postId, userId } = action.payload;

      const updatedUsers = state.users?.map((user) => {
        if (user?.$id === userId) {
          return {
            ...user,
            posts: user.posts?.map((post) => {
              if (post?.$id === postId) {
                return {
                  ...post,
                  comments: post.comments?.map((comment) => {
                    if (comment?.$id === commentId) {
                      return {
                        ...comment,
                        replies: [...(comment.replies || []), reply],
                      };
                    }
                    return comment;
                  }),
                };
              }
              return post;
            }),
          };
        }
        return user;
      });
      state.users = updatedUsers;
      try {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // Delete all users
    deleteReduxUsers: (state) => {
      state.users = null;
      try {
        localStorage.setItem("users", JSON.stringify(state.users));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    // Delete the current user
    deleteReduxCurrentUser: (state) => {
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
  setReduxUsers,
  setReduxCurrentUser,
  addReduxUser,
  setReduxUserPost,
  updateReduxUserPost,
  deleteReduxUserPost,
  deleteReduxUsers,
  deleteReduxCurrentUser,
  updateReduxUserPostLike,
  updateReduxFollowingFollowers,
  addReduxUserPostComment,
  addReduxUserCommentReply,
  updateReduxUserReplyLike,
  updateReduxUserCommentLike,
  updateReduxCurrentUser,
  updateReduxUser,
} = userSlice.actions;

export default userSlice.reducer;
