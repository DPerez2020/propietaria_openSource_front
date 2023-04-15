import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://activosfijos20230411182616.azurewebsites.net/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;