import { reqLogin, reqLogout } from "@api/acl/login";
import { reqMobileLogin } from "@api/acl/oauth";

import { LOGIN, LOGOUT } from "../constants/login";

//账户名密码登录
export const loginSync = (token) => ({
  type: LOGIN,
  data: token,
});

export const login = (username, password) => {
  return (dispatch) => {
    return reqLogin(username, password).then(({ token }) => {
      dispatch(loginSync(token));
      // 返回token，外面才能接受
      return token;
    });
  };
};

// 手机号密码登录
export const mobileLogin = (mobile, code) => {
  return (dispatch) => {
    // 执行异步代码~
    return reqMobileLogin(mobile, code).then(({ token }) => {
      dispatch(loginSync(token));
      return token;
    });
  };
};

/**
 * 删除token
 */
export const removeToken = () => ({
  type: LOGOUT,
});

/**
 * 登出
 */
export const logout = () => {
  return (dispatch) => {
    return reqLogout().then(() => {
      dispatch(removeToken());
    });
  };
};
