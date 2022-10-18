import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataToSubmit) {
  console.log(dataToSubmit);
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  console.log("로그인 페이로드", request);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
