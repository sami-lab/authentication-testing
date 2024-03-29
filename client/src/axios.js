import axios from "axios";

let baseURL = "/api/v1";
if (process.env.NODE_ENV==="development") {
  baseURL = "http://localhost:5000/api/v1";
}
const instance = axios.create({
  baseURL,
});
export default instance;
