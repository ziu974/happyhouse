import Vue from "vue";
import Vuex from "vuex";
// TODO 이거 modules로 빼자
// import http from "@/util/http-common.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import memberStore from "@/store/modules/memberStore.js";
import boardStore from "@/store/modules/boardStore.js";
import houseStore from "@/store/modules/houseStore.js";

export default new Vuex.Store({
  // ! 이렇게 modules로 나눠놓음(규모가 커지면 유지보수하기가 불편해지기 때문에)
  modules: {
    memberStore,
    boardStore,
    houseStore,
  },
  state: {
    // account: null,
    // // 비동기 통신으로 받아온 데이터 역시 vuex의 state에서 관리해야 된다
    // sidos: [{ value: null, text: "선택하세요" }],
    // guguns: [{ value: null, text: "선택하세요" }],
    // houses: [],
    // house: null,
  },
  mutations: {
    // SET_LOGGEDIN_ACCOUNT(state, account) {
    //   state.account = account.id;
    // },
    // // ? Mutations: 첫번째 인자값: state (상태변경해야되니까), 두번쨰 인자값: data (넘어오게 되는, payload에 해당)
    // SET_SIDO_LIST(state, sidos) {
    //   sidos.data.forEach((sido) => {
    //     //  받아온 데이터를 bootstrap-vue의 form-select의 형식에 맞게 넣어준다
    //     // (여기에선 this가 아니라, vuex의 state여야 되므로 "state.")
    //     state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
    //   });
    // },
    // SET_GUGUN_LIST(state, guguns) {
    //   guguns.forEach((gugun) => {
    //     // ".data" 배치 다르게 해봄
    //     state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
    //     //? BUT, 선택지에 계속 추가가 되는 것을 볼 수 있음 -> CLEAR_GUGUN_LIST mutation
    //   });
    // },
    // CLEAR_SIDO_LIST(state) {
    //   state.sidos = [{ value: null, text: "선택하세요" }];
    // },
    // CLEAR_GUGUN_LIST(state) {
    //   //! 이 mutation의 호출 (HouseSearchBar.vue의 methods.gugunList()부분을 보자)
    //   state.guguns = [{ value: null, text: "선택하세요" }]; // 초기값으로
    // },
    // SET_HOUSE_LIST(state, houses) {
    //   // console.log(houses);
    //   state.houses = houses;
    // },
    // SET_DETAIL_HOUSE(state, house) {
    //   state.house = house;
    // },
  },
  actions: {
    // postLogin({ commit }, user) {
    //   http
    //     .post("/user/login", {
    //       userid: user.userid,
    //       userpwd: user.userpwd,
    //     })
    //     .then((response) => {
    //       commit("SET_LOGGEDIN_ACCOUNT", response);
    //       let msg = "NOPE";
    //       console.log(response);
    //       if (response.data.userid) {
    //         msg = "안녕하세요 *" + response.data.name + "*님";
    //       }
    //       alert(msg);
    //       this.movePage();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // 비동기통신은 vuex의 acitons에서 처리해야 된다
    // getSido({ commit }) {
    //   http
    //     .get("/map/sido")
    //     .then((response) => {
    //       // response.data.forEach((sido) => {
    //       //   //  받아온 데이터를 bootstrap-vue의 form-select의 형식에 맞게 넣어준다
    //       //   this.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
    //       // });
    //       commit("SET_SIDO_LIST", response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // getGugun({ commit }, sidoCode) {
    //   // getSido()와 달리, GET /map/gugun은 시도코드를 params로 넘겨줘야 한다
    //   const params = { sido: sidoCode };
    //   http
    //     .get(`/map/gugun`, { params })
    //     .then((response) => {
    //       console.log(response);
    //       commit("SET_GUGUN_LIST", response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // getHouseList({ commit }, gugunCode) {
    //   //! 이 service키는 외부에 노출되면 안되므로, ".env.local"파일을 생성해서, 변수처럼 쓰자 ("VUE_APP"으로 무조건 써야 된다)
    //   const API_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
    //   const SERVICE_URL = "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";
    //   const params = {
    //     LAWD_CD: gugunCode,
    //     DEAL_YMD: "202110",
    //     serviceKey: decodeURIComponent(API_KEY),
    //   };
    //   http
    //     .get(SERVICE_URL, { params })
    //     .then((response) => {
    //       console.log(commit, response);
    //       commit("SET_HOUSE_LIST", response.data.response.body.items.item);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // detailHouse({ commit }, house) {
    //   // TODO house.일련번호를 이용하여 API 호출 구현
    //   // (house 하나에 대한 객체 받아오기)
    //   //... TODO
    //   // FIXME 일단은 공공데이터에서 받아왔던 것을 그대로 넘기는 것으로 임시로 구현
    //   commit("SET_DETAIL_HOUSE", house);
    // },
  },
  //* https://www.npmjs.com/package/vuex-persistedstate
  //? 새로고침을 해도 localStorage에 정보가 저장되게-> 단, 너무 많은 데이터를 담을 경우 보안문제, 부하 문제 있을 수 있음 (option사용해서 저장할 것들 지정하기)
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
