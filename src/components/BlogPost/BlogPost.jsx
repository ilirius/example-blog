import React from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";

import "./style.static.scss";

export const BlogPost = ({ post, clickTag }) => {
  const onClick = evt => {
    evt.preventDefault();
    clickTag(post.getCategory());
  };

  const onImgError = evt => {
    const { target } = evt;
    target.src = post.getBannerUrl();
    target.style.position = "static";
  };

  return (
    <article
      className="post"
      itemProp="blogPosts"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <meta itemProp="author" content="EuroAuto" />
      {/* <div
        className="hidden"
        itemProp="publisher"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <meta itemProp="name" content="ЕвроАвто" />
        <meta itemProp="address" content="Санкт-Петербург, Левашовский пр., 15" />
        <meta itemProp="telephone" content="+78127031515" />
        <link itemProp="url" href={`https://${window.__host_main__}`} />
        <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
          <img itemProp="url image" src="/images/logo-black.svg" />
        </div>
      </div> */}
      <meta
        itemScope
        itemProp="mainEntityOfPage"
        itemType="https://schema.org/WebPage"
        itemID={post.getUrn()}
      />
      <meta itemProp="image" content={post.getBannerUrl()} />
      <a key={post.getUrn()} href={post.getUrn()}>
        <div className="img">
          <LazyLoad height={127}>
            <img
              src={post.getBannerUrl() + "?thumbnail=350x190"}
              alt={post.getH1()}
              onError={onImgError}
            />
          </LazyLoad>
        </div>
        <div className="fx content">
          <div className="content_title" itemProp="headline">
            {post.getH1()}
          </div>
          <meta itemProp="description" content={post.getDescription()} />
          <div className="content_text" itemProp="abstract">
            {post.getPreviewText()}
          </div>
          <div className="fx content_footer">
            {/* "Y-m-d" */}
            <div className="content_footer__data" itemType="https://schema.org/dateCreated">
              <meta itemProp="datePublished" content={post.getCreatedAt("yyyy-MM-dd")} />
              <meta itemProp="dateModified" content={post.getCreatedAt("yyyy-MM-dd")} />
              {post.getCreatedAt()}
            </div>
            {post.getCategory().getId() && (
              <button className="footer__tag content_footer__tag" onClick={onClick}>
                {post.getCategory().getLabel()}
              </button>
            )}
          </div>
        </div>
      </a>
    </article>
  );
};

BlogPost.propTypes = {
  post: PropTypes.any,
  clickTag: PropTypes.func,
};

export default BlogPost;
