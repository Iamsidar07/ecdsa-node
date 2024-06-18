import axios from "axios";

const server = axios.create({
  // baseURL: "http://localhost:3042",
  baseURL: "https://ecdsa-node-3g5z.onrender.com",
});

export default server;
