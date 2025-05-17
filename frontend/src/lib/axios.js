import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Base URL for access
  withCredentials: true, // For cross-site access, frontend and backend have different servers. Also allows cookie to be sent with requests.
});
