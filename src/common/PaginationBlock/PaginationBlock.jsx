import * as React from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";

export class PaginationBlock extends React.PureComponent {
  static propTypes = {
    activePage: PropTypes.number,
    infinityButtonOnClick: PropTypes.func,
    infinityButtonIsShow: PropTypes.bool,
    infinityButtonText: PropTypes.string,
    itemsCountPerPage: PropTypes.number,
    pageRangeDisplayed: PropTypes.number,
    showNumber: PropTypes.bool,
    totalItemsCount: PropTypes.number,
    href: PropTypes.string,
    getPageUrl: PropTypes.func,
    setPageUrl: PropTypes.func,
  };

  static defaultProps = {
    activePage: 1,
    infinityButtonOnClick: () => {},
    infinityButtonIsShow: false,
    infinityButtonText: "Показать еще",
    showNumber: true,
    pageRangeDisplayed: 5,
  };

  /**
   * @param {number} i
   *
   * @memberof PaginationBlock
   */
  onClick = i => {
    const { setPageUrl } = this.props;
    setPageUrl(i);
  };

  render() {
    const {
      activePage,
      totalItemsCount,
      showNumber,
      infinityButtonText,
      infinityButtonIsShow,
      infinityButtonOnClick,
      href,
      itemsCountPerPage,
      getPageUrl,
    } = this.props;
    // console.log(this.props);

    return (
      <>
        {totalItemsCount > itemsCountPerPage && (
          <div className="pagination-block">
            {infinityButtonIsShow && (
              <button
                className="btn btn-default btn-block"
                type="button"
                onClick={infinityButtonOnClick}
              >
                {infinityButtonText}
              </button>
            )}

            {showNumber && (
              <div className="text-center">
                {showNumber && (
                  <Pagination
                    activePage={activePage}
                    totalItemsCount={totalItemsCount}
                    href={href}
                    itemsCountPerPage={itemsCountPerPage}
                    getPageUrl={getPageUrl}
                    onChange={this.onClick}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

export default PaginationBlock;
