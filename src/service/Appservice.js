import axios from "./axios";
import axiosuser from "./useraxios";

const loginUser = (client_id, username, password, grant_type, scope) => {
  return axios.post("/auth/realms/VIMC/protocol/openid-connect/token", {
    client_id,
    username,
    password,
    grant_type,
    scope,
  });
};

const getUser = () => {
  return axiosuser.get("/api/v1/users/current-user");
};

const getLichCoQuan = (from_date, to_date) => {
  return axiosuser.get(
    `/api/v1/work-schedules?from_date=${from_date}&to_date=${to_date}`
  );
};

const getDetailLich = (code) => {
  return axiosuser.get(`/api/v1/work-schedules/${code}`);
};

const getUserDepartments = () => {
  return axiosuser.get("/api/v1/departments/users");
};

const createLichCoQuan = (data) => {
  return axiosuser.post("/api/v1/work-schedules", data);
};

const deleteLichCoQuan = (code) => {
  return axiosuser.delete(`/api/v1/work-schedules/${code}`);
};

const updateLichCoQuan = (code, data) => {
  return axiosuser.put(`/api/v1/work-schedules/${code}`, data);
};
// /api/v1/work-schedules/SDL3141347563449173
export {
  loginUser,
  getUser,
  getLichCoQuan,
  getDetailLich,
  getUserDepartments,
  createLichCoQuan,
  deleteLichCoQuan,
  updateLichCoQuan,
};
