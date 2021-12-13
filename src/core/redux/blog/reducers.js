import { handleActions } from "redux-actions";
import { combineReducers } from "redux";

import filter from "../blog.filter/reducers";

import {
  appBlogPagePostsFailure,
  appBlogPagePostsRequest,
  appBlogPagePostsSuccess,
  appBlogPagePostsByFilterFailure,
  appBlogPagePostsByFilterRequest,
  appBlogPagePostsByFilterSuccess,
} from "./actions";

const isFetching = handleActions(
  {
    [appBlogPagePostsFailure]: () => false,
    [appBlogPagePostsRequest]: () => true,
    [appBlogPagePostsSuccess]: () => false,
    [appBlogPagePostsByFilterFailure]: () => false,
    [appBlogPagePostsByFilterRequest]: () => true,
    [appBlogPagePostsByFilterSuccess]: () => false,
  },
  false
);

const isFetched = handleActions(
  {
    [appBlogPagePostsFailure]: () => true,
    [appBlogPagePostsRequest]: () => false,
    [appBlogPagePostsSuccess]: () => true,
    [appBlogPagePostsByFilterFailure]: () => true,
    [appBlogPagePostsByFilterRequest]: () => false,
    [appBlogPagePostsByFilterSuccess]: () => true,
  },
  false
);

const posts = handleActions(
  {
    [appBlogPagePostsSuccess]: (state, action) => action.payload.posts,
    [appBlogPagePostsByFilterSuccess]: (state, action) => action.payload.posts,
  },
  []
);

const pagesCount = handleActions(
  {
    [appBlogPagePostsSuccess]: (state, action) => parseInt(action.payload.pagesCount, 10),
    [appBlogPagePostsByFilterSuccess]: (state, action) => parseInt(action.payload.pagesCount, 10),
  },
  0
);

export const getBlogPosts = state => state.blog.posts;
export const getBlogPostsIsFetched = state => state.blog.isFetched;
export const getBlogPostsIsFetching = state => state.blog.isFetching;
export const getBlogPostsPagesCount = state => state.blog.pagesCount;
export const getBlogPostsFilterCategories = state => state.blog.filter.categories;
export const getBlogPostsFilterCategoryName = state => state.blog.filter.categoriy;

export default combineReducers({
  isFetched,
  isFetching,
  posts,
  pagesCount,
  filter,
});
