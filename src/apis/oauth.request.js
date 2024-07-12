import axios from "axios";
import { Api } from '../utils/BaseUrlServer'
const API = Api()

export const loginOAuthGoogle = (id) => {
  return API.post("auth/login-oauth-success", id)
}
