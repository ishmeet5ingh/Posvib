import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts:  null,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    createPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      state.posts.splice(action.payload, 1);
    },

    updatePost: (state, action) => {
      const { id, dbPost } = action.payload;
      state.posts = state.posts.map((post) =>
        post.$id === id ? dbPost : post
      );
    },

    updateLike: (state, action) => {
      const { id, likesArray } = action.payload;
    
      state.posts = state.posts.map(post =>
        post.$id === id ? { ...post, likes: likesArray} : post
      );
  
    },

    deleteAllPost: (state) => {
      state.posts = null;
    },
  },
});

export const { setPosts, createPost, updateLike, deletePost, updatePost, deleteAllPost } =
  configSlice.actions;

export default configSlice.reducer;
