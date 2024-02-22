import axios from "axios";
import { ENDPOINT } from "../services/constants.tsx";

const fetchExercises = () => {
  return axios
    .get(`${ENDPOINT}/fitness/exercises`, {})
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const addExercise = (cookie, data) => {
  return axios
    .post(`${ENDPOINT}/fitness/exercise`, data, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const updateExerciseById = (cookie, newData) => {
  return axios
    .put(`${ENDPOINT}/fitness/exercise`, newData, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const deleteExercise = (Id, cookie) => {
  return axios
    .delete(`${ENDPOINT}/fitness/exercise/${Id}`, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const exerciseService = {
  fetchExercises,
  addExercise,
  deleteExercise,
  updateExerciseById,
};

export default exerciseService;
