import axios from "axios";

export let instance;
if (import.meta.env.VITE_NODE_ENV === "development") {
  instance = axios.create({
    baseURL: "/",
  });
  console.log("local");
} else {
  instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  console.log("BE");
}
export default instance;
