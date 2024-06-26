import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  page: 2,
  comments: null,
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
        state.posts = []; // Initialize as empty array if null
      }
      state.posts = [...state.posts, ...action.payload]; // Use spread to merge arrays
    },

    createPost: (state, action) => {

      state.posts = [action.payload, ...state.posts]
    },

    deletePost: (state, action) => {
      const postId = action.payload;
      const index = state.posts.findIndex((post) => post?.$id === postId);
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },

    updatePost: (state, action) => {
      const { id, dbPost } = action.payload;
      state.posts = state.posts.map((post) =>
        post?.$id === id ? dbPost : post
      );
    },

    updateLike: (state, action) => {
      const { userId, postId } = action.payload;
      console.log("userId", userId, "postId", postId);
      state.posts = state.posts.map((post) =>
        post?.$id === postId
          ? {
              ...post,
              likes: post?.likes?.includes(userId)
                ? post?.likes?.filter((id) => id !== userId)
                : [...post?.likes, userId],
            }
          : post
      );
    },

    deleteAllPost: (state) => {
      state.posts = null;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    createComment: (state, action) => {
      const { comment, postId } = action.payload;

      state.posts = state.posts?.map((post) =>
        post?.$id === postId
          ? { ...post, comments: [comment, ...post.comments] }
          : post
      );
    },

    createReply: (state, action) => {
      const { reply, replyCreatorImageUrl, commentId, postId } = action.payload;

      state.posts = state.posts?.map((post) =>
        post?.$id === postId
          ? {
              ...post,
              comments: post.comments?.map((comment) =>
                comment?.$id === commentId
                  ? { ...comment, replies: [...comment.replies, reply] }
                  : comment
              ),
            }
          : post
      );
    },
  },
});

export const {
  setPosts,
  createPost,
  updateLike,
  deletePost,
  updatePost,
  deleteAllPost,
  setPage,
  addPosts,
  createComment,
  createReply,
} = configSlice.actions;

export default configSlice.reducer;
