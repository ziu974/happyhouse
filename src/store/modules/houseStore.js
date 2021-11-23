//! 이렇게 import한 것을 받아오고 있음
import { sidoList, gugunList, houseList, dongList } from "@/api/house.js";

const houseStore = {
  // ? store를 여러개로 분리를 했기 때문에 namespace를 설정해서 구분할 수 있어야 됨 (index.js가 사용)
  namespaced: true,
  state: {
    // 비동기 통신으로 받아온 데이터 역시 vuex의 state에서 관리해야 된다
    sidos: [{ value: null, text: "시/도" }],
    guguns: [{ value: null, text: "구/군" }],
    dongs: [{ value: null, text: "동" }],
    filterOptions: {
      selectedDong: Number,
      aptnameKeyword: String,
      priceRange: [Number, Number],
      sortPrice: Boolean,
    },
    filterOption: null,
    // selectedDong: Number,
    houses: [],
    filteredHouses: [],
    house: null,
    //TODO 'house'와 동일, 임시로 넣어둠 - 삭제해라
    selectedHouse: null,
  },

  getters: {},

  mutations: {
    // ? Mutations: 첫번째 인자값: state (상태변경해야되니까), 두번쨰 인자값: data (넘어오게 되는, payload에 해당)
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        //  받아온 데이터를 bootstrap-vue의 form-select의 형식에 맞게 넣어준다
        // (여기에선 this가 아니라, vuex의 state여야 되므로 "state.")
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        // ".data" 배치 다르게 해봄
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
        //? BUT, 선택지에 계속 추가가 되는 것을 볼 수 있음 -> CLEAR_GUGUN_LIST mutation
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "시/도" }];
    },
    CLEAR_GUGUN_LIST(state) {
      //! 이 mutation의 호출 (HouseSearchBar.vue의 methods.gugunList()부분을 보자)
      state.guguns = [{ value: null, text: "구/군" }]; // 초기값으로
    },
    CLEAR_FILTER_OPTION(state) {
      state.filterOption = null;
      state.dongs = [{ value: null, text: "동 선택" }]; // 초기값으로
    },
    // CLEAR_DONG_LIST(state) {
    //   state.selectedDong = null;
    //   state.dongs = [{ value: null, text: "동 선택" }]; // 초기값으로
    // },
    CLEAR_HOUSE_LIST(state) {
      state.houses = null;
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
      // state.filteredHouses = houses;
    },
    SET_FILTERED_HOUSE_LIST(state, filteredHouses) {
      state.filteredHouses = filteredHouses;
    },
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
      state.selectedHouse = house;
    },
    SET_FILTER_OPTION(state, filterObj) {
      console.log(filterObj);
      state.filterOption = filterObj;
    },
    // SET_DONG_FILTER(state, dongCode) {
    //   console.log("필터링(동별): " + dongCode);
    //   // state.filterOption.selectedDong = dongCode;
    //   state.selectedDong = dongCode;
    // },
  },

  actions: {
    // 비동기통신은 vuex의 acitons에서 처리해야 된다
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      // getSido()와 달리, GET /map/gugun은 시도코드를 params로 넘겨줘야 한다
      const params = {
        sido: sidoCode,
      };
      //! JS에서 함수는 일급객체이기 때문에 이렇게 함수를 parameter로 넘길 수 있다 (3개의 param을 보자) -> house.js를 보자
      // -> api/house.js 가보자
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      // getSido()와 달리, GET /map/gugun은 시도코드를 params로 넘겨줘야 한다
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList: ({ commit }, gugunCode) => {
      //! 이 service키는 외부에 노출되면 안되므로, ".env.local"파일을 생성해서, 변수처럼 쓰자 ("VUE_APP"으로 무조건 써야 된다)

      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      const API_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      // const SERVICE_URL = "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";
      const params = {
        numOfRows: 1000,
        LAWD_CD: gugunCode,
        DEAL_YMD: "202110",
        serviceKey: decodeURIComponent(API_KEY),
      };
      houseList(
        params,
        (response) => {
          console.log(response.data.response.body.items.item);
          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse({ commit }, house) {
      // TODO house.일련번호를 이용하여 API 호출 구현
      // (house 하나에 대한 객체 받아오기)
      //... TODO
      // FIXME 일단은 공공데이터에서 받아왔던 것을 그대로 넘기는 것으로 임시로 구현
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default houseStore;
