import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

import style from "./style.module.scss";

const Loader = ({ notLoadedWhile, side, position, bgColorIntensive, text, children }) => (
  <>
    {notLoadedWhile ? (
      <div
        className={cx(
          style.loader,
          style[side],
          style[position],
          style[`bg-color-intensive-${bgColorIntensive}`]
        )}
      >
        <div className={style.loader__icon} />
        {text !== "" && <div className={style.loader__text}>{text}</div>}
      </div>
    ) : children ? (
      children
    ) : null}
  </>
);

Loader.propTypes = {
  children: PropTypes.node,
  notLoadedWhile: PropTypes.bool,
  text: PropTypes.string,
  bgColorIntensive: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  position: PropTypes.oneOf(["absolute", "center", "fixed", "left", "relative", "right"]),
  side: PropTypes.string,
};

Loader.defaultProps = {
  bgColorIntensive: "30",
  notLoadedWhile: true,
  position: "relative",
  side: "center",
  text: "Загрузка...",
};

export default Loader;
