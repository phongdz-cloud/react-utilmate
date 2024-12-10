// import axios from "axios";
import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName,
    email,
    password,
    phone,
  };
  return axios.post(URL_BACKEND, data);
};

const updateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id,
    fullName,
    phone,
  };
  return axios.put(URL_BACKEND, data);
};

const deleteUserAPI = (_id) => {
  const URL_BACKEND = "/api/v1/user";
  return axios.delete(URL_BACKEND + `/${_id}`);
};

const fetchAllUserAPI = () => {
  const URL_BACKEND = "/api/v1/user?current=1&pageSize=1";
  return axios.get(URL_BACKEND);
};

const handleUploadFile = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL_BACKEND, bodyFormData, config);
};

const updateUserAvatarAPI = (_id, fullName, phone, avatar) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id,
    fullName,
    phone,
    avatar,
  };
  return axios.put(URL_BACKEND, data);
};

export {
  createUserAPI,
  updateUserAPI,
  fetchAllUserAPI,
  deleteUserAPI,
  handleUploadFile,
  updateUserAvatarAPI,
};
