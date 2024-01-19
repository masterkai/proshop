import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/",
  timeout: 60000,
  withCredentials: false,
});
class APIClient {
  constructor(endpoint) {
    console.log(process.env.REACT_APP_BASE_URL);
    this.endpoint = endpoint;
  }
  getAll = async (config) => {
    const res = await axiosInstance.get(this.endpoint, config);
    return res.data;
  };
}

export default APIClient;
