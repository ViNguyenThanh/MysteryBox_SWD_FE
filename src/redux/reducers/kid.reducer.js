import actionsType from "../actions/action.types";

const kidReducer = (
  state = { dataKids: [], loading: false, error: "" },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionsType.KID_START:
      return { ...state, loading: true };
    case actionsType.KID_SUCCESS:
      return {
        ...state,
        dataKids: payload?.kidProfilesByUserId,
        loading: false,
        error: "",
      };
    case actionsType.KID_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return { ...state };
  }
};

export default kidReducer;
