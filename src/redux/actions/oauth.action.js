import * as OAuthApi from "../../apis/oauth.request";
import actionsType from "./action.type";
export const loginOAuthGoogle = (id) => async (dispatch) => {
  try {
    let response = await OAuthApi.loginOAuthGoogle(id);
    if (response?.data.response.success) {
      dispatch({
        type: actionsType.LOGIN_OAUTH_SUCCESS,
        payload: response.data.response.token,
      });
    } else {
      dispatch({
        type: actionsType.LOGIN_OAUTH_SUCCESS,
        payload: null,
      });
    }
  } catch (error) {
    dispatch({ type: actionsType.LOGIN_OAUTH_SUCCESS, payload: null });
  }
};

export const logoutAuth = () => ({
  type: actionsType.LOGOUT_OAUTH,
});
