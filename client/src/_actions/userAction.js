import axios from "axios";
import { AUTH_USER, LOGIN_USER, REGISTER_USER } from "./types";

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
  console.log(userData);
  const req = axios
    .post("/api/users/register", userData)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: req,
  };
}

export function authUser() {
  const req = axios
    .get("http://localhost:5000/api/users/auth")
    .then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: req,
  };
}
