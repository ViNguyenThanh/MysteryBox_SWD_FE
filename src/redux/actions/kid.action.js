import * as KidApi from "../../apis/kid.request";
import actionsType from "./action.types";
export const getKidProfile = () => async (dispatch) => {
  dispatch({ type: actionsType.KID_START });
  try {
    const response = await KidApi.getKidProfile();
    dispatch({ type: actionsType.KID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: actionsType.KID_FAIL, payload: "error" });
  }
};

export const createProfileKid = (data) => async (dispatch) => {
  dispatch({ type: actionsType.KID_START });
  try {
    const response = await KidApi.createInfoProfileKid(data);
    dispatch({ type: actionsType.KID_CREATE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: actionsType.KID_FAIL,
      payload: "",
    });
  }
};

export const updateProfileKid = (profileId, data) => async (dispatch) => {
  dispatch({ type: actionsType.KID_START });
  try {
    const response = await KidApi.updateInfoProfileKid(profileId, data);
    dispatch({
      type: actionsType.KID_UPDATE_SUCCESS,
      payload: { response, profileId },
    });
  } catch (error) {
    dispatch({
      type: actionsType.KID_FAIL,
      payload: "",
    });
  }
};
