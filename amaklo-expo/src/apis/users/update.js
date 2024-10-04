import { USERS_BASE_URL } from "../constants";
import { getResponseData } from "../get-data";

export const updateUser = (token, id, { name, address, title }) => {
  USERS_BASE_URL.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return USERS_BASE_URL.put(`/update/${id}`, { name, address, title })
    .then(getResponseData);
};
