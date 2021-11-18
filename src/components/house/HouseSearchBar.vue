<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
    <!-- ? https://bootstrap-vue.org/docs/components/form-select -->
    <b-col class="sm-3">
      <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="gugunCode" :options="guguns" @change="searchApt"></b-form-select>
    </b-col>
  </b-row>
</template>

<script>
////  import http from "@/util/http-common.js";
// * Map 사용 (여기는 "...map*"하면 자동완성되는 부분임 ㅎㅎ)
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      //// sidos: [{ value: null, text: "선택하세요" }],
      gugunCode: null,
      dongCode: null,
    };
  },
  // state의 값은 주로 computed에서 처리한다고 했음
  computed: {
    //// sidos() {
    //   // vuex의 Store가 가지고 있는 state의 "sidos"를 가져옴
    ////   return this.$store.state.sidos;
    ////},
    // 위의 것을, Map을 써서 더 간단하게 해보자 (Mapper를 사용하면 이렇게 여러개를 간편하게 구현할 수 있음)
    ...mapState(["sidos", "guguns", "houses"]), //+ 위의 import 부분
  },
  methods: {
    ...mapActions(["getSido", "getGugun", "getHouseList"]),
    ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),
    sidoList() {
      // 다른 페이지 갔다가 오면, 구군 리스트처럼 시도리스트도 그냥 계속 다시 얻어와져서 추가되는 것을 볼 수 있음. 알아서 해볼것
      this.CLEAR_SIDO_LIST(); // (created부분에 배치해도 되겠죠?)
      this.getSido();
    },
    // 시/도가 선택되면 호출되는 함수
    gugunList() {
      console.log(this.sidoCode);
      // form-select 초기화 먼저 진행 (mutation 호출)
      // (원래는 이렇게 가야 함)
      //// this.$store.commit("CLEAR_GUGUN_LIST", 블라블라);
      // mapper 방식으로 간편하게 (위에 "...mapMutations([...])"부분도 잊지 말고)
      this.CLEAR_GUGUN_LIST();

      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      if (this.gugunCode) this.getHouseList(this.gugunCode);
    },
    sendKeyword() {},
  },
  created() {
    //// http
    ////   .get("/map/sido")
    ////   .then((response) => {
    ////     console.log(response);
    ////     response.data.forEach((sido) => {
    ////      //  받아온 데이터를 bootstrap-vue의 form-select의 형식에 맞게 넣어준다
    ////       this.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
    ////     });
    ////   })
    ////   .catch((error) => {
    // //    console.log(error);
    ////   });
    // * Vuex가 가지고 있는 Action 호출
    /* 시도구군 받아오기 */
    //// this.$store.dispatch("getSido");
    // Map 사용방식으로 변경
    this.sidoList();
  },
};
</script>

<style></style>
