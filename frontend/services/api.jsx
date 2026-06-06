import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api/github";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data } = error.response;
      return Promise.reject({
        message: data?.message || "An error occurred",
        code: data?.code || "UNKNOWN_ERROR",
        status: error.response.status,
        resetTime: data?.resetTime || null,
      });
    }
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        message: "Request timed out. Please try again.",
        code: "TIMEOUT",
        status: 504,
      });
    }
    return Promise.reject({
      message: "Unable to reach the server. Please check your connection.",
      code: "NETWORK_ERROR",
      status: 0,
    });
  }
);

export const getUser = async (username) => {
  const response = await api.get(`/github/users/${username}`);
  return response.data.data;
};

export const getRepos = async (username, page = 1, perPage = 10) => {
  const response = await api.get(`/github/users/${username}/repos`, {
    params: { page, per_page: perPage },
  });
  return response.data.data;
};

export const getLanguages = async (username) => {
  const response = await api.get(`/github/users/${username}/languages`);
  return response.data.data;
};