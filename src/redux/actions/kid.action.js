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