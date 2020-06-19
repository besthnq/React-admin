import React, { Component } from "react";
import { connect } from "react-redux";

import Authorized from "@comps/Authorized";
import PublicLayout from "./PublicLayout";

@connect((state) => ({ token: state.token }))
class Layout extends Component {
  render() {
    // 有token--登录过--渲染组件
    const { token } = this.props;
    return token ? <Authorized /> : <PublicLayout />;
  }
}
export default Layout;
