import axios from "axios";

axios.defaults.baseURL = "https://glim-api-6a04c7cb168e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
