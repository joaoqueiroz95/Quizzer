import axios, { AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import { NotificationManager } from "react-notifications";
import { isPathPrivate, logout } from "./auth";
import httpStatusCodes from "http-status-codes";

const API_URL = process.env.REACT_APP_API_URL;

const authHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (
      err.response.status === httpStatusCodes.UNAUTHORIZED &&
      isPathPrivate(window.location.pathname)
    ) {
      return logout();
    }

    NotificationManager.error(err.response.data.message, "Error");
    throw new Error(err.response.data.message);
  }
);

const getRequest = (url: string, headers: AxiosRequestConfig = {}) => {
  headers.headers = authHeader();
  return axios.get(`${API_URL}/${url}`, headers);
};

const postRequest = (
  url: string,
  data: any = {},
  headers: AxiosRequestConfig = {}
) => {
  headers.headers = authHeader();
  return axios.post(`${API_URL}/${url}`, data, headers);
};

const putRequest = (
  url: string,
  data: any,
  headers: AxiosRequestConfig = {}
) => {
  headers.headers = authHeader();
  return axios.put(`${API_URL}/${url}`, data, headers);
};

const deleteRequest = (url: string, headers: AxiosRequestConfig = {}) => {
  headers.headers = authHeader();
  return axios.delete(`${API_URL}/${url}`, headers);
};

const httpRequest = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};

export default httpRequest;
