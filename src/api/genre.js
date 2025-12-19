import axios from "axios";

export const getGenres = () => {
  return axios.get("http://localhost:3000/genres");
};
