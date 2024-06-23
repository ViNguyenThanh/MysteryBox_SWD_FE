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

export const createInfoProfileKid = (data) => {
  const token = getToken();
  return API.post("/create-profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateInfoProfileKid = (profileId, dataUpdate) => {
  const token = getToken();
  return API.patch(`/update-profile/${profileId}`, dataUpdate, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
