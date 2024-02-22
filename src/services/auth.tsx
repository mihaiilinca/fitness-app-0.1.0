import axios from "axios";
import { ENDPOINT } from "../services/constants.tsx";

const registerUser = (registrationDataRef) => {
  return axios
    .post(`${ENDPOINT}/signup`, registrationDataRef.current)
    .then((response) => response)
    .catch((error) => error);
};

const login = (email, password) => {
  return axios
    .post(`${ENDPOINT}/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => error);
};

const logout = () => {
  return axios
    .post(`${ENDPOINT}/logout`, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => error);
};

const authService = {
  registerUser,
  login,
  logout,
};

export default authService;
