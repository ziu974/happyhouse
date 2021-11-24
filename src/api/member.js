import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  //! 여기가 핵심: header에 토큰을 담아서 같이 보냄!!!
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function modifyInfo(userInfo, success, fail) {
  await api.put(`/user`, JSON.stringify(userInfo)).then(success).catch(fail);
}

async function deleteId(userid, success, fail) {
  await api.delete(`/user/${userid}`).then(success).catch(fail);
}

async function createId(userInfo, success, fail) {
  console.log(userInfo);
  await api.post(`/user/register`, JSON.stringify(userInfo)).then(success).catch(fail);
}

async function getUserPassword(params, success, fail) {
  console.log(params);
  await api.post(`/user/findpw`, JSON.stringify(params)).then(success).catch(fail);
}

// function logout(success, fail)

export { login, findById, modifyInfo, deleteId, createId, getUserPassword };
