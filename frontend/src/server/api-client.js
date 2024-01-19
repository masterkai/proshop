import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:5000/api/",
  timeout: 60000,
  withCredentials: false,
});
class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  get = async (config) => {
    const res = await axiosInstance.get(this.endpoint, config);
    return res.data;
  };
}

export default APIClient;
