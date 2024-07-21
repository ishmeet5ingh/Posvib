import { createSlice } from "@reduxjs/toolkit";
import { comment } from "postcss";

const initialState = {
  posts: null,
  page: 2,
  comments: null,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    // set posts
    setReduxPosts: (state, action) => {
      state.posts = action.payload;
    },

    // add posts
    addReduxPosts: (state, action) => {
      if (state.posts === null) {
        state.posts = []; // Initialize as empty array if null
      }
      state.posts = [...state.posts, ...action.payload]; // Use spread to merge arrays
    },

    // create post
    createReduxPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },

    // delete post
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

    updateReduxPostLike: (state, action) => {
      const { userId, postId } = action.payload;
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

    // update like of comment
    updateReduxCommentLike: (state, action) => {
      const { userId, postId, commentId } = action.payload;
      state.posts = state.posts.map((post) =>
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
      );
    },
    updateReduxReplyLike: (state, action) => {
      const { userId, postId, commentId, replyId } = action.payload;
      state.posts = state.posts.map((post) =>
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
                                ? reply?.likes?.filter((id) => id !== userId)
                                : [...reply?.likes, userId],
                            }
                          : reply
                      ),
                    }
                  : comment
              ),
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

      state.posts = state.posts?.map((post) => {
        if (post?.$id === postId) {
          if (
            post.comments.length > 0 &&
            post.comments[0]?.$id === comment?.$id
          ) {
            post.comments.shift();
            return {
              ...post,
              comments: [comment, ...post.comments],
            };
          } else {
            return {
              ...post,
              comments: [comment, ...post.comments],
            };
          }
        }
        return post;
      });
    },

    deleteReduxComment: (state, action) => {
      const { postId, commentId } = action.payload;

      state.posts = state.posts?.map((post) =>
        post?.$id === postId
          ? {
              ...post,
              comments: post.comments?.filter(
                (comment) => comment?.$id !== commentId
              ),
            }
          : post
      );
    },

    deleteReduxReply: (state, action) => {
      const { postId, commentId, replyId } = action.payload;

      state.posts = state.posts?.map((post) =>
        post?.$id === postId
          ? {
              ...post,
              comments: post.comments?.map((comment) =>
                comment?.$id === commentId
                  ? {
                      ...comment,
                      replies: comment.replies?.filter(
                        (reply) => reply?.$id !== replyId
                      ),
                    }
                  : comment
              ),
            }
          : post
      );
    },

    // updateReduxComment: (state, action){

    // }

    createReduxReply: (state, action) => {
      const { reply, creator, commentId, postId,  } = action.payload;
      state.posts = state.posts?.map((post) => {
        if (post?.$id === postId) {
          return {
            ...post,
            comments: post.comments?.map((comment) => {
              if (comment?.$id === commentId) {
                if (
                  comment.replies?.length > 0 &&
                  comment.replies[0]?.$id === reply?.$id
                ) {
                  comment.replies.shift();
                  return {
                    ...comment,
                    replies: [{...reply, ...creator}, ...comment.replies],
                  };
                } else {
                  return {
                    ...comment,
                    replies: [{...reply, ...creator}, ...comment.replies],
                  };
                }
              }
              return comment;
            }),
          };
        }
        return post;
      });
    },
  },
});

export const {
  setReduxPosts,
  createReduxPost,
  updateReduxPostLike,
  deleteReduxPost,
  updateReduxPost,
  deleteAllReduxPost,
  setReduxPage,
  addReduxPosts,
  createReduxComment,
  deleteReduxComment,
  createReduxReply,
  deleteReduxReply,
  updateReduxCommentLike,
  updateReduxReplyLike
} = configSlice.actions;

export default configSlice.reducer;
