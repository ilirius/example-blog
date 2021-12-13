import { createActions } from "redux-actions";

const {
  app: {
    blogPage: {
      posts: {
        failure: appBlogPagePostsFailure,
        request: appBlogPagePostsRequest,
        success: appBlogPagePostsSuccess,
        byFilter: {
          failure: appBlogPagePostsByFilterFailure,
          request: appBlogPagePostsByFilterRequest,
          success: appBlogPagePostsByFilterSuccess,
        },
      },
      filter: {
        categories: {
          failure: blogPostFilterCategoriesFailure,
          request: blogPostFilterCategoriesRequest,
          success: blogPostFilterCategoriesSuccess,
        },
      },
    },
  },
} = createActions({
  APP: {
    BLOG_PAGE: {
      POSTS: {
        FAILURE: undefined,
        REQUEST: [
          data => data.currentPage,
          data => ({
            replace: data["replace"] || false,
          }),
        ],
        SUCCESS: data => ({ posts: data.posts || [], pagesCount: data.pagesCount || 0 }),
        BY_FILTER: {
          FAILURE: undefined,
          REQUEST: data => data,
          SUCCESS: [
            data => ({ posts: data.posts || [], pagesCount: data.pagesCount || 0 }),
            data => ({ category: data.category }),
          ],
        },
      },
      FILTER: {
        CATEGORIES: {
          FAILURE: undefined,
          REQUEST: undefined,
          SUCCESS: data => data,
        },
      },
    },
  },
});

export {
  appBlogPagePostsByFilterFailure,
  appBlogPagePostsByFilterRequest,
  appBlogPagePostsByFilterSuccess,
  appBlogPagePostsFailure,
  appBlogPagePostsRequest,
  appBlogPagePostsSuccess,
  blogPostFilterCategoriesFailure,
  blogPostFilterCategoriesRequest,
  blogPostFilterCategoriesSuccess,
};
