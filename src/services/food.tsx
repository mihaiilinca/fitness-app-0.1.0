import axios from "axios";
import { ENDPOINT } from "../services/constants.tsx";

const fetchFood = () => {
  return axios
    .get(`${ENDPOINT}/fitness/food`, {})
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const addFood = (cookie, data) => {
  return axios
    .post(`${ENDPOINT}/fitness/food`, data, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const updateFoodById = (cookie, newData) => {
  return axios
    .put(`${ENDPOINT}/fitness/food`, newData, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const deleteFood = (Id, cookie) => {
  return axios
    .delete(`${ENDPOINT}/fitness/food/${Id}`, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const foodService = {
  fetchFood,
  addFood,
  deleteFood,
  updateFoodById,
};

export default foodService;
