import { put, takeLatest, call, select } from "redux-saga/effects";

// eslint-disable-next-line no-unused-vars
import {
  appBlogPagePostsFailure,
  appBlogPagePostsRequest,
  appBlogPagePostsSuccess,
  blogPostFilterCategoriesFailure,
  blogPostFilterCategoriesRequest,
  blogPostFilterCategoriesSuccess,
  appBlogPagePostsByFilterFailure,
  appBlogPagePostsByFilterRequest,
  appBlogPagePostsByFilterSuccess,
} from "./actions";
import { getBlogPosts } from "./reducers";

import {
  getBlogPosts as getApiBlogPosts,
  getBlogPostsCategories,
  getBlogPostsByFilterCategories,
} from "./api";

import Blog from "../../lib/classes/Blog";
import BlogCategory from "../../lib/classes/Blog/BlogCategory";

function* onFetchBlogPosts(actions) {
  try {
    const data = yield call(getApiBlogPosts, actions.payload);
    const curPosts = yield select(getBlogPosts);
    const pagesCount = data.data.data.pagesCount;
    let posts = Object.keys(data.data.data.posts).map(
      i => new Blog(data.data.data.posts[i].id, data.data.data.posts[i])
    );

    if (!actions.meta.replace) {
      posts = [...curPosts, ...posts];
    }

    yield put(
      appBlogPagePostsSuccess({
        posts,
        pagesCount,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(appBlogPagePostsFailure(err));
  }
}

function* onFetchPostFilterCategories() {
  try {
    const data = yield call(getBlogPostsCategories);
    const categories = data.data.data.map(i => new BlogCategory(i.id, i));
    yield put(blogPostFilterCategoriesSuccess(categories));
  } catch (err) {
    console.error("onFetchPostFilterCategories", err);
    yield put(blogPostFilterCategoriesFailure(err));
  }
}

function* onFetchBlogPostsByFilter(actions) {
  try {
    const data = yield call(getBlogPostsByFilterCategories, {
      category: actions.payload.category,
      page: actions.payload.currentPage || 1,
    });
    const curPosts = yield select(getBlogPosts);

    const pagesCount = data.data.data.pagesCount;

    let posts = Object.keys(data.data.data.posts).map(
      i => new Blog(data.data.data.posts[i].id, data.data.data.posts[i])
    );

    if (!actions.payload.replace) {
      posts = [...curPosts, ...posts];
    }

    yield put(
      appBlogPagePostsByFilterSuccess({
        posts,
        pagesCount,
        category: actions.payload,
      })
    );
  } catch (err) {
    console.error("onFetchBlogPostsByFilter", err);
    yield put(appBlogPagePostsByFilterFailure(err));
  }
}

export function* appBlogPageWatch() {
  yield takeLatest(appBlogPagePostsRequest, onFetchBlogPosts);
  yield takeLatest(blogPostFilterCategoriesRequest, onFetchPostFilterCategories);
  yield takeLatest(appBlogPagePostsByFilterRequest, onFetchBlogPostsByFilter);
}
