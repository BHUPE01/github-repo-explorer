import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api/github";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message:
          error.response.data?.message || "An error occurred",
        code:
          error.response.data?.code || "UNKNOWN_ERROR",
        status: error.response.status,
      });
    }

    return Promise.reject({
      message: "Network error",
      code: "NETWORK_ERROR",
      status: 0,
    });
  }
);

export const getUser = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const getRepos = async (username, page = 1, perPage = 10) => {
  const response = await api.get(`/users/${username}/repos`, {
    params: {
      page,
      per_page: perPage,
    },
  });

  return response.data;
};

export const getLanguages = async (username) => {
  const response = await api.get(`/users/${username}/languages`);
  return response.data;
};

export default api;