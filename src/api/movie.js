import axios from "axios";

const API_URL = "http://localhost:3000/api/movies";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMovies = () => axios.get(API_URL);
export const addMovie = (data) => axios.post(API_URL, data, authHeader());
export const updateMovie = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, authHeader());
export const deleteMovie = (id) =>
  axios.delete(`${API_URL}/${id}`, authHeader());
