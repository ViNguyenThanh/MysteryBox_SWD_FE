import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api();

export const getKidProfile = () => {
  const token = getToken();
  return API.get("/get-profiles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};