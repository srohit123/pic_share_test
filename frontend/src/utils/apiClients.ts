import axios from "axios";

import { handleResponse, handleResponseError } from "./interceptors";

const baseURL = process.env.REACT_APP_API_BASE_PATH;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(handleResponse, handleResponseError);

export default axiosInstance;
