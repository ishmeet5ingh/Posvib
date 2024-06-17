import { createSlice } from "@reduxjs/toolkit";

const parseJSON = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item && item !== "undefined" ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage`, error);
    return null;
  }
};

const initialState = {
  users: parseJSON("users"),
  currentUser: parseJSON("currentUser"),
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      try {
        localStorage.setItem("currentUser", JSON.stringify(state.users));
      } catch (error) {
        console.error("Error updating currentUser in localStorage", error);
      }
    },

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

    updateUserPost: (state, action) => {
      const updatedPost  = action.payload;

      
      const updatedUsers = state.users?.map((user) =>
        user.$id === updatedPost.userId
          ? {
              ...user,
              posts: user.posts?.map((post) =>
                post.$id === updatedPost.$id ? updatedPost : post
              ),
            }
          : user
      )

      state.users = updatedUsers
      try {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },

    deleteUserPost: (state, action)=> {
        const {userId, postId} = action.payload

        console.log("userId", userId)
        console.log("postId", postId)
        const updatedUsers = state.users?.map( (user) => user.$id === userId ? {...user, posts: user?.posts?.filter( (post) => post.$id !== postId)} : user)

        state.users = updatedUsers
        try {
            localStorage.setItem("users", JSON.stringify(updatedUsers));
          } catch (error) {
            console.error("Error updating users in localStorage", error);
          }
    },

    deleteUsers: (state) => {
      state.users = null;
      try {
        localStorage.setItem("users", JSON.stringify(state.users));
      } catch (error) {
        console.error("Error updating users in localStorage", error);
      }
    },
    deleteCurrentUser: (state) => {
      state.currentUser = null;
      try {
        localStorage.setItem("currentUser", JSON.stringify(state.users));
      } catch (error) {
        console.error("Error updating currentUser in localStorage", error);
      }
    },
  },
});

export const {
  setUsers,
  setCurrentUser,
  setUserPost,
  updateUserPost,
  deleteUserPost,
  deleteUsers,
  deleteCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
