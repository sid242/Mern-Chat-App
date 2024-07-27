import axios from "axios";
import { BASE_URL } from "../clientConfig";
import { getLocalStorage, setLocalStorage } from "../utils";
import { userAuthRoutes } from "../constants/apiRoutes";
import { authRoutes } from "../constants/appRoutes";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = getLocalStorage("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      error?.response?.data?.statusCode === 401100 &&
      originalRequest?.url === `${BASE_URL}${userAuthRoutes.REFRESH_TOKEN}`
    ) {
      window.location.href = authRoutes.LOGIN;
      return Promise.reject(error);
    }

    if (
      error?.response?.data?.statusCode === 401100 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = getLocalStorage("refreshToken");
      return axios
        .post(
          `${BASE_URL}${userAuthRoutes.REFRESH_TOKEN}`,
          {
            refreshToken,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 201) {
            setLocalStorage("accessToken", res?.data?.data?.accessToken);
            setLocalStorage("refreshToken", res?.data?.data?.refreshToken);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + res?.data?.data?.accessToken ??
              getLocalStorage("accessToken");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default API;
