import React, { Component } from "react";
import { connect } from "react-redux";

import { getMenu, getUserInfo } from "./redux";
import Loading from "../Loading";
import PrimaryLayout from "../../layout/PrimaryLayout";

@connect(null, { getMenu, getUserInfo })
class Authorized extends Component {
  state = {
    isLoading: true,
  };
  componentDidMount() {
    const { getMenu, getUserInfo } = this.props;
    const promises = [getMenu(), getUserInfo()];

    Promise.all(promises).then(() => {
      this.setState({
        isLoading: false,
      });
    });
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : <PrimaryLayout />;
  }
}
export default Authorized;
