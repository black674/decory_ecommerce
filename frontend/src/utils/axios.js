import axios from "axios";

const instance = axios.create({
  baseURL: "https://decoryecommerce-production.up.railway.app/api",
  withCredentials: true,
});

export default instance;
