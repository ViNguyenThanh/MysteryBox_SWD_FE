import actionsType from "../actions/action.type";

const oauthReducer = (state = { isLoggedIn: false, token: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionsType.LOGIN_OAUTH_SUCCESS: {
      return { ...state, isLoggedIn: payload ? true : false, token: payload };
    }
    case actionsType.LOGOUT_OAUTH: {
      return { ...state, isLoggedIn: false, token: null };
    }
    default:
      return { ...state };
  }
};

export default oauthReducer;
