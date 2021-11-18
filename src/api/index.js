import axios from "axios";
// ! 여기에 URL설정을 다 해놓음 (src/config/index.js로 가보자)
import { API_BASE_URL, APT_DEAL_URL } from "@/config";

//! 이렇게 통신할 주소를 (함수의 객체로) 나눠놓음!! (각각) -> 맨 밑에 export
// axios 객체 생성
function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

function houseInstance() {
  const instance = axios.create({
    baseURL: APT_DEAL_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

//! 여기의 axios를 사용하는 것은 vuex의 Actions이기 떄문에 /store/*.js에서 import 받아갈 것
export { apiInstance, houseInstance };
