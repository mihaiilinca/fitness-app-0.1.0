import axios from "axios";
import { ENDPOINT } from "../services/constants.tsx";

const fetchDays = (profileId, cookie) => {
  return axios
    .get(`${ENDPOINT}/fitness/days/${profileId}`, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(erro));
};

const addDay = (cookie, data) => {
  return axios
    .post(`${ENDPOINT}/fitness/day`, data, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const updateDayById = (cookie, newData) => {
  return axios
    .put(`${ENDPOINT}/fitness/day`, newData, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const deleteDay = (Id, cookie) => {
  return axios
    .delete(`${ENDPOINT}/fitness/day/${Id}`, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const dayService = {
  fetchDays,
  addDay,
  deleteDay,
  updateDayById,
};

export default dayService;
