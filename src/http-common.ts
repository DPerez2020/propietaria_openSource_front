import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:7047/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;