/* eslint-disable react/prop-types */
import * as React from "react";
import classNames from "classnames";

const FilterPanel = ({ className, filterButtons, clickTag, activeCategory }) => (
  <div className={classNames("filter-panel island", className)}>
    {filterButtons.map((filterButton, i) => (
      <React.Fragment key={i + "frag" + filterButton.getLabel()}>
        <div
          className={classNames("filter", { "active" : activeCategory && activeCategory == filterButton.getUrn() })}
          key={i + "" + filterButton.getLabel()}
        >
          <div className="filter-block__item filter-block__item_condition">
            <button
              className="filter-item__link filter-condition__link filter-item__link_disabled_no"
              onClick={() => clickTag(filterButton)}
            >
              {filterButton.getLabel()}: {filterButton.getPostsCount()}
              <span className="x-close-filter" />
            </button>
          </div>
        </div>
      </React.Fragment>
    ))}
  </div>
);
export default FilterPanel;
