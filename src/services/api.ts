import axios from "axios";

/** Axios instance configured with base URL and default headers */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
