import axios from "axios";
import { API_ENDPOINT } from "./constants";

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4"
  }
});

export default axiosInstance;
