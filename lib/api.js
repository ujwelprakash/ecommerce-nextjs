import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Proxy through Next.js → avoids CORS
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
