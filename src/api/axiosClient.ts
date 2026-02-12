import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://45.77.255.114:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;