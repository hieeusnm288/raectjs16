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
    `api/v1/work-schedules?from_date=${from_date}&to_date=${to_date}`
  );
};

export { loginUser, getUser, getLichCoQuan };
