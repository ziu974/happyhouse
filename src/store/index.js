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
  //* https://www.npmjs.com/package/vuex-persistedstate
  //? 새로고침을 해도 localStorage에 정보가 저장되게-> 단, 너무 많은 데이터를 담을 경우 보안문제, 부하 문제 있을 수 있음 (option사용해서 저장할 것들 지정하기)
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
