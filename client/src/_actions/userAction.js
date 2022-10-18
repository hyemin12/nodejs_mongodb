import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";

export function loginUser(userData) {
  const req = axios
    .post("/api/users/login", userData)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: req,
  };
}

export function registerUser(userData) {
  const req = axios
    .post("/api/users/register", userData)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: req,
  };
}
