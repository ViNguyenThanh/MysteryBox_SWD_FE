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

export const getChooseKid = () => {
  const token = getToken();
  return API.get("/get-choose-profiles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const banProfileKid = (id, status) => {
//   const token = getToken();
//   return API.patch(
//     `/ban-profile/${id}`,
//     {
//       status,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };
