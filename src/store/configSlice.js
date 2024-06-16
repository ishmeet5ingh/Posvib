import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  page: 2
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    addPosts: (state, action) => {
      if (state.posts === null) {
        state.posts = [];  // Initialize as empty array if null
      }
      state.posts = [...state.posts, ...action.payload];  // Use spread to merge arrays
    },

    createPost: (state, action) => {
      state.posts.push(action.payload);
    },

    deletePost: (state, action) => {
      const postId = action.payload;
      const index = state.posts.findIndex(post => post.$id === postId);
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
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

    setPage: (state, action) => {
      state.page = action.payload
    }
  },
});

export const { setPosts, createPost, updateLike, deletePost, updatePost, deleteAllPost, setPage, addPosts} =
  configSlice.actions;

export default configSlice.reducer;
