import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api();

export const getBox = () => {
  return API.get("/get-mysterybox");
};

export const getBoxById = (boxId) => {
  return API.get(`/get-mysterybox/${boxId}`);
};

export const getBoxCondition = (data) => {
  return API.post("/get-mysterybox-condition", data);
};

export const createBox = (data) => {
  const token = getToken()
  return API.post("/create-mysterybox", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
