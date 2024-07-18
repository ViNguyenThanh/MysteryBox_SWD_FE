import axios from "axios";

export const Api = () => {
  return axios.create({
    baseURL: "https://mysterybox-swd-be.onrender.com/api/v1",
    // baseURL: "https://mysterybox-swd-server-on-air.onrender.com/api/v1",
  });
};