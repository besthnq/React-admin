import React, { Component } from "react";

import List from "./components/List";
import Search from "./components/Search";

export default class Chapter extends Component {
  fullscreenRef = React.createRef();
  render() {
    return (
      <div ref={this.fullscreenRef} style={{ backgroundColor: "#f5f5f5" }}>
        <Search />
        <List fullscreenRef={this.fullscreenRef} />
      </div>
    );
  }
}
