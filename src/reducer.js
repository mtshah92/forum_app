import { createReducer } from "@reduxjs/toolkit";
import { forumData } from "./db/db";

const initialState = {
  data: forumData,
};
export const customReducer = createReducer(initialState, {
  upvote: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      posts: state.data.posts.map((item) =>
        item.postId === action.payload
          ? { ...item, upvotes: item.upvotes + 1 }
          : item
      ),
    },
  }),
  downvote: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      posts: state.data.posts.map((item) =>
        item.postId === action.payload
          ? { ...item, downvotes: item.downvotes + 1 }
          : item
      ),
    },
  }),
  bookmark: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      posts: state.data.posts.map((item) =>
        item.postId === action.payload
          ? { ...item, isBookmarked: item.isBookmarked ? false : true }
          : item
      ),
    },
  }),
  latest: (state) => {
    return {
      ...state,
      data: {
        ...state.data,
        posts: [...state.data.posts].sort(
          (a, b) => Date(a.createdAt) - Date(b.createdAt)
        ),
      },
    };
  },
  popular: (state) => {
    return {
      ...state,
      data: {
        ...state.data,
        posts: [...state.data.posts].sort((a, b) => b.upvotes - a.upvotes),
      },
    };
  },
});
