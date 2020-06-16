import { LOGIN, LOGOUT } from "../constants/login";

const initToken = localStorage.getItem("user_token") || "";

function token(prevState = initToken, action) {
  switch (action.type) {
    case LOGIN:
      return action.data;
    case LOGOUT:
      return "";
    default:
      return prevState;
  }
}

export default token;
