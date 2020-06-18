// 配置路由表

import { Suspense, lazy } from "react";

/* 
    默认打包的模块名称使用id命名，id从0开始递增 
    webpackChunkName: "login" 给打包的模块取个名字
  */
const Login = lazy(() => import(/* webpackChunkName:"login" */ "@pages/Login"));
const Oauth = lazy(() =>
  import(/* webpackChunkName:"oauth" */ "@pages/Login/components/Oauth")
);
const NotFound = lazy(() => import(/* webpackChunkName:"404" */ "@pages/404"));

// 公共路由
const constantRoutes = [
  {
    title: "登录",
    path: "/login",
    component: Login,
  },
  {
    title: "授权登录",
    path: "/oauth",
    component: Oauth,
  },
  {
    title: "404",
    path: "*",
    component: NotFound,
  },
];
// 私有路由
const defaultRoutes = [{ title: "首页", path: "/", component: "Admin" }];

export { constantRoutes, defaultRoutes };
