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
    setReduxPosts: (state, action) => {
      state.posts = action.payload;
    },

    addReduxPosts: (state, action) => {
      if (state.posts === null) {
        state.posts = []; // Initialize as empty array if null
      }
      state.posts = [...state.posts, ...action.payload]; // Use spread to merge arrays
    },

    createReduxPost: (state, action) => {

      state.posts = [...state.posts, action.payload]
    },

    deleteReduxPost: (state, action) => {
      const postId = action.payload;
      const index = state.posts.findIndex((post) => post?.$id === postId);
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },

    updateReduxPost: (state, action) => {
      const { id, dbPost } = action.payload;
      state.posts = state.posts.map((post) =>
        post?.$id === id ? dbPost : post
      );
    },

    updateReduxLike: (state, action) => {
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

    deleteAllReduxPost: (state) => {
      state.posts = null;
    },

    setReduxPage: (state, action) => {
      state.page = action.payload;
    },

    createReduxComment: (state, action) => {
      const { comment, postId } = action.payload;

      state.posts = state.posts?.map((post) =>
        post?.$id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      );
    },

    deleteReduxComment: (state, action) => {

    },

    createReduxReply: (state, action) => {
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
  setReduxPosts,
  createReduxPost,
  updateReduxLike,
  deleteReduxPost,
  updateReduxPost,
  deleteAllReduxPost,
  setReduxPage,
  addReduxPosts,
  createReduxComment,
  createReduxReply,
} = configSlice.actions;

export default configSlice.reducer;
