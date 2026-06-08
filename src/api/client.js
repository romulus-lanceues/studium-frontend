import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const client = axios.create({
  baseURL: apiBaseUrl,
  // withCredentials: true allows the browser to send cookies along with requests to the backend, which is essential for maintaining sessions and authentication states.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }

    pendingQueue = [];
  });
};

client.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const authUrl = originalRequest?.url ?? "";
    const isAuthRequest =
      authUrl.includes("/api/v1/auth/login") ||
      authUrl.includes("/api/v1/auth/refresh-token");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => client(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the access token
        await client.post("/api/v1/auth/refresh-token");
        processQueue(null);
        return client(originalRequest);
      } catch (refreshError) {
        //Refresh token is invalid or expired, redirect to login
        window.location.href = "/";
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
