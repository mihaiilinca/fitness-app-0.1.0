import axios from "axios";
import { ENDPOINT } from "../services/constants.tsx";

const fetchProfiles = (userId, cookie) => {
  return axios
    .get(`${ENDPOINT}/fitness/profiles`, {
      headers: {
        user: `${userId}`,
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const addProfile = (cookie, profile) => {
  return axios
    .post(`${ENDPOINT}/fitness/profile`, profile, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const fetchProfileById = (ID) => {};

const fetchProfileByIdDate = (ID, date) => {};

const updateProfileById = (cookie, newData) => {
  return axios
    .put(`${ENDPOINT}/fitness/profile`, newData, {
      headers: {
        cookies: `${cookie}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const deleteProfile = (profileId, cookie) => {
  return axios
    .delete(`${ENDPOINT}/fitness/profile/${profileId}`, {
      headers: { cookies: `${cookie}` },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const profileService = {
  fetchProfiles,
  fetchProfileById,
  fetchProfileByIdDate,
  addProfile,
  updateProfileById,
  deleteProfile,
};

export default profileService;
