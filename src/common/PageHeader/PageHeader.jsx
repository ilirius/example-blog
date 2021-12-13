/* eslint-disable react/prop-types */
import React, { Component } from "react";
// import "./PageHeader.css";

export default class PageHeader extends Component {
  render() {
    const { name, className, children } = this.props;
    let headerContent = name ? name : children;
    return (
      <div className="page-header cart-header">
        <h1 className={className ? className : ""}>{headerContent}</h1>
      </div>
    );
  }
}
