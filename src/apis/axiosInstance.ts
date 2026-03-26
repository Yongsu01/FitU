import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("Authorization");
    if (accessToken) {
      config.headers["Authorization"] = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await refreshClient.get("/auth/reissue");
        const newAccessToken = refreshRes.data?.accessToken;

        if (newAccessToken) {
          sessionStorage.setItem("Authorization", newAccessToken);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("재발급 실패",refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
