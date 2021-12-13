/* eslint-disable no-unused-vars */
import { handleActions, handleAction } from "redux-actions";
import { combineReducers } from "redux";

import {
  // blogPostFilterCategoriesFailure,
  // blogPostFilterCategoriesRequest,
  blogPostFilterCategoriesSuccess,
  appBlogPagePostsByFilterSuccess,
} from "../blog/actions";

const categories = handleAction(
  blogPostFilterCategoriesSuccess,
  (state, action) => action.payload,
  []
);
const category = handleAction(
  appBlogPagePostsByFilterSuccess,
  (state, action) => action.meta.category,
  ""
);

export default combineReducers({
  categories,
  category,
});
