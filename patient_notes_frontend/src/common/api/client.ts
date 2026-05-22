import axios from "axios";
import { envs } from "../utils";

const client = axios.create({
  baseURL: envs.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
