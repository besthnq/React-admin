import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { constantRoutes } from "@conf/routes";

const Loading = <div>loading...</div>;

export default class PublicLayout extends Component {
  renderRoutes = (routes) => {
    return routes.map((route) => {
      // Route组件根据path自动加载相应的组件
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact
        ></Route>
      );
    });
  };

  render() {
    return (
      <Suspense fallback={Loading}>
        <Switch>{this.renderRoutes(constantRoutes)}</Switch>
      </Suspense>
    );
  }
}
