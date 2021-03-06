//! SOLUTION: 이렇게 2개의 도메인을 나눔 (index.js가보자)
import { apiInstance, houseInstance } from "./index.js";

const api = apiInstance();
const house = houseInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}

//! sidoCOde, then, catch 에 해당하는 것을 이렇게 넘겨줌
//! 여기에서 REST통신을 함
function gugunList(params, success, fail) {
  api.get(`/map/gugun`, { params: params }).then(success).catch(fail);
}

// * 그런데, 여기에서는 "house.*()"이렇게 요청보냄-> line1 주석
function houseList(params, success, fail) {
  //? 이인규: axios를 직접 사용해야 된다(http-common 객체 X)
  house.get(``, { params: params }).then(success).catch(fail);
}

function dongList(params, success, fail) {
  api.get(`/map/dong`, { params: params }).then(success).catch(fail);
}

export { sidoList, gugunList, houseList, dongList };
