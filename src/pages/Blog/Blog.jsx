import React, { useState, useEffect, useRef } from "react";
import Helmet from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import querystring from "querystring";
import { useHistory, useLocation, useRouteMatch, useParams } from "react-router-dom";

import { PageHeader, PaginationBlock, Loader } from "../../common";
import { FilterPanel, BlogPost } from "../../components";

import {
  appBlogPagePostsRequest,
  blogPostFilterCategoriesRequest,
  appBlogPagePostsByFilterRequest,
} from "../../core/redux/blog/actions";
import {
  getBlogPosts,
  getBlogPostsPagesCount,
  getBlogPostsFilterCategories,
  getBlogPostsIsFetched,
  getBlogPostsIsFetching,
} from "../../core/redux/blog/reducers";

import "./style.static.scss";

const COUNT_PER_PAGE = 15;

export const BlogPage = () => {
  const history = useHistory();
  let { search } = useLocation();
  search = querystring.parse(search.replace("?", ""));
  const { category } = useParams();

  const match = useRouteMatch();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [replace, setReplace] = useState(false);

  const posts = useSelector(state => getBlogPosts(state));
  const postsPagesCount = useSelector(state => getBlogPostsPagesCount(state));
  const filterCategories = useSelector(state => getBlogPostsFilterCategories(state));
  const isFetched = useSelector(state => getBlogPostsIsFetched(state));
  const isFetching = useSelector(state => getBlogPostsIsFetching(state));

  const prevCategory = usePrevious(category);
  const prevQuerySearch = usePrevious(search);

  let activeCategory = false;

  useEffect(() => {
    if (typeof search["_escaped_fragment_"] === "undefined") {
      dispatch(blogPostFilterCategoriesRequest());
      if (search["page"] !== void 0) {
        setCurrentPage(search["page"]);
      }

      if (category !== void 0) {
        dispatch(
          appBlogPagePostsByFilterRequest({
            category,
            replace: true,
            currentPage,
          })
        );
      } else {
        dispatch(appBlogPagePostsRequest({ currentPage }));
      }

      history.push(location.pathname + "" + location.search);
    }
  }, []);

  useEffect(() => {
    if (
      prevCategory !== category ||
      (prevQuerySearch !== void 0 && prevQuerySearch["page"] !== search["page"])
    ) {
      let _currentPage = 1;
      let _replace = replace;

      if (
        search["page"] !== void 0 ||
        (prevQuerySearch !== void 0 && prevQuerySearch["page"] !== search["page"])
      ) {
        _currentPage = parseInt(search["page"], 10);
      }

      setCurrentPage(_currentPage);

      if (
        prevCategory !== category ||
        replace ||
        history.action === "POP" ||
        typeof search["page"] === "undefined"
      ) {
        _replace = true;
      }

      if (category !== void 0) {
        dispatch(
          appBlogPagePostsByFilterRequest({
            category,
            replace: _replace,
            currentPage: _currentPage,
          })
        );
      } else {
        dispatch(appBlogPagePostsRequest({ currentPage: _currentPage, replace: _replace }));
      }
      setReplace(false);
    }
  }, [category, search]);

  /**
   * Генерация текста тега title
   * 
   * @returns {String}
   */
  const getTitle = () => {
    let title = "";

    if (isFetched) {
      if (typeof category !== "undefined" && filterCategories.length > 0) {
        let _category = filterCategories.filter(x => x.getUrn() === category);

        if (_category[0]) {
          title = _category[0].getLabel();
        }
      } else {
        title = "Полезные статьи об автомобилях для автолюбителей";
      }

      title += " | Авто Блог Евроавто";

      if (currentPage > 1) {
        title += ` | Страница ${currentPage}`;
      }
    }
    return title;
  };

  /**
   *  Генерация текста мета тега description
   * 
   * @returns {String}
   */
  const getDescription = () => {
    let description = "";

    if (isFetched) {
      if (typeof category !== "undefined" && filterCategories.length > 0) {
        let _category = filterCategories.filter(x => x.getUrn() === category);

        if (_category[0]) {
          description = _category[0].getDescription();
        }
      } else if (filterCategories.length > 0) {
        description =
          "Полезные статьи для автовладельцев от экспертов: советы по выбору, содержанию, ремонту и продаже автомобилей. ";
      }
    }
    return description;
  };

  /**
   * Формирование ссылок для перехода по страницам в пагринации
   *
   * @param {number} i
   */
  const getPageUrl = i => {
    let url = `/blog/?page=${i}`;
    if (typeof category !== "undefined") {
      url = `${match.url}?page=${i}`;
    }
    return url;
  };

  /**
   * Метод отвечающий за переключении страницы по пагиныции
   *
   * @param {number} i
   */
  const setPageUrl = i => {
    let pageNumberUrl = "";

    if (i > 1) {
      pageNumberUrl = `?page=${i}`;
    }

    if (typeof category !== "undefined") {
      history.push(`${match.url}${pageNumberUrl}`);
    } else {
      history.push(`/blog/${pageNumberUrl}`);
    }

    setReplace(true);
  };

  const handleClickPagination = () => {
    const nextCurrentPage = currentPage + 1;
    if (nextCurrentPage <= postsPagesCount) {
      if (typeof category !== "undefined") {
        history.push(`${match.url}?page=${nextCurrentPage}`);
      } else {
        // history.push(``);
      }
      setCurrentPage(nextCurrentPage);
    } else if (nextCurrentPage > postsPagesCount) {
      setCurrentPage(postsPagesCount);
    }
  };

  const handleClickBlogTag = categoryTag => {
    // history.push();
    setCurrentPage(1);
  };

  if (category) {
    activeCategory = filterCategories.filter(categoryItem => category === categoryItem.getUrn())[0];
  }

  return (
    <>
      <Helmet
        title={getTitle()}
        meta={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
          {
            name: "format-detection",
            content: "telephone=no",
          },
          { property: "og:title", content: getTitle() },
          { name: "description", content: getDescription() },
        ]}
      />
      <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemType="https://schema.org/ListItem" itemScope>
          <a href="/" title="euroauto.ru" itemProp="item">
            <span itemProp="name" className="hidden">
              Главная
            </span>
            <svg
              className="svg-icon"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="15px"
              height="15px"
            >
              <use href="#home"></use>
            </svg>
          </a>
          <meta itemProp="position" content="1"></meta>
        </li>
        {!activeCategory && (
          <li
            className="active"
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
            itemScope
          >
            <span itemProp="name">Блог</span>
            <meta itemProp="position" content="2"></meta>
          </li>
        )}

        {activeCategory && (
          <>
            <li itemProp="itemListElement" itemType="https://schema.org/ListItem" itemScope>
              <a href="/blog/" itemProp="item">
                <span itemProp="name">Блог</span>
              </a>
              <meta itemProp="position" content="2"></meta>
            </li>
            <li
              className="active"
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
              itemScope
            >
              <span itemProp="name">{activeCategory.getLabel()}</span>
              <meta itemProp="position" content="3"></meta>
            </li>
          </>
        )}
      </ol>

      <PageHeader>Блог</PageHeader>

      <FilterPanel
        className="filters"
        filterButtons={filterCategories}
        activeCategory={category}
        clickTag={handleClickBlogTag}
      />

      <Loader notLoadedWhile={!isFetched && isFetching} position={"absolute"} />

      <div className="fx wrap" itemScope itemType="https://schema.org/Blog">
        <React.Fragment>
          <meta
            itemProp="description"
            content="Полезные статьи для автовладельцев от экспертов: советы по выбору, содержанию, ремонту и продаже автомобилей."
          />
          {posts.map(post => (
            <BlogPost
              key={post.getId() + "-" + post.getH1()}
              post={post}
              clickTag={handleClickBlogTag}
            />
          ))}
        </React.Fragment>
      </div>
      {posts.length > 0 && (
        <PaginationBlock
          infinityButtonOnClick={handleClickPagination}
          infinityButtonIsShow={currentPage < postsPagesCount}
          activePage={parseInt(currentPage, 10)}
          totalItemsCount={postsPagesCount * COUNT_PER_PAGE}
          showNumber={true}
          itemsCountPerPage={COUNT_PER_PAGE}
          getPageUrl={getPageUrl}
          setPageUrl={setPageUrl}
        />
      )}
    </>
  );
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
