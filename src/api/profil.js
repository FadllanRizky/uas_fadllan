import axios from "axios";
import { getToken } from "../utils/token";

const API = "http://localhost:3000/api/profil"; // ⬅️ HARUS PROFIL

export const getProfile = () => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
