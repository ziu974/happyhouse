<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <card shadow class="kr-font-regular">
      <b-row class="mt-2 mb-4 text-center" align-h="center"><h3 style="color: #8898aa">Search Options</h3></b-row>
      <b-row class="mt-4 mb-4 text-center">
        <!-- ? https://bootstrap-vue.org/docs/components/form-select -->
        <b-col class="sm-3">
          <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
        </b-col>
        <b-col class="sm-3">
          <b-form-select v-model="gugunCode" :options="guguns" @change="searchApt"></b-form-select>
        </b-col>
      </b-row>
      <hr />
      <!-- <div> -->
      <b-row class="mt-4 mb-4" align-h="center">
        <b-col cols="4" align-self="center">
          <base-radio v-model="radios.radio" name="dongRadio" :disabled="radioDisabled" class="kr-font-bold">동별검색</base-radio>
        </b-col>
        <b-col>
          <b-form-select v-model="dongCode" :options="dongs" @change="filterHouseByDong" @input="radios.radio = 'dongRadio'"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-4 mb-4 kr-font-fine" align-h="center">
        <b-col cols="4" align-self="center">
          <base-radio v-model="radios.radio" name="priceRadio" :disabled="radioDisabled" class="kr-font-bold">가격범위</base-radio>
        </b-col>
        <b-col class="sm-3">
          <!-- :value="{ min: this.minP, max: this.maxP }" -->
          <base-slider
            v-if="sliderVal"
            v-bind:sliderVal="sliderVal"
            v-model="sliders.priceSlider"
            :customval="sliderVal"
            :range="{ min: sliderVal[0], max: sliderVal[1] }"
            :options="sliderOptions"
            @input="filterHouseByPrice"
            connect="true"
            ref="priceSlider"
            class="mt-4"
          ></base-slider>
          <!-- @input="radios.radio = 'priceRadio'" -->
          <div class="text-left text-muted" v-if="sliderVal">
            <small>최저가: {{ this.sliderVal[0] }} | 최고가: {{ this.sliderVal[1] }} (만원)</small>
            <!-- <small>Value (만원): {{ this.$refs.priceSlider }} ~ {{}}</small> -->
          </div>
          <div class="text-left text-muted" v-else>
            <small>(지역을 먼저 선택하세요)</small>
            <!-- <small>Value (만원): {{ this.$refs.priceSlider }} ~ {{}}</small> -->
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-4 mb-4" align-h="center">
        <b-col cols="4" align-self="center">
          <base-radio v-model="radios.radio" name="aptRadio" :disabled="radioDisabled" class="kr-font-bold">아파트명</base-radio>
        </b-col>
        <!-- <b-col></b-col> -->
        <b-col class="">
          <b-form-input
            v-model="options.aptnameOp"
            placeholder="아파트 이름"
            @keypress.enter="filterHouseByAptname"
            style="border-radius: 50px"
            @focus="radios.radio = 'aptRadio'"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <!-- <b-col
          >가격정렬
          <base-switch v-model="switches.sortOn"></base-switch>
        </b-col> -->
        <b-col class="sm-3" align="right">
          <b-button variant="outline-warning" @click="clearOptions">clear</b-button>
        </b-col>
      </b-row>
      <!-- </div> -->
    </card>
  </b-container>
</template>

<script>
////  import http from "@/util/http-common.js";
// * Map 사용 (여기는 "...map*"하면 자동완성되는 부분임 ㅎㅎ)
import { mapState, mapActions, mapMutations } from "vuex";
// import BaseSlider from "@/components/ui/BaseSlider";

const houseStore = "houseStore";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      //// sidos: [{ value: null, text: "선택하세요" }],
      gugunCode: null,
      dongCode: null,
      sliderVal: null,
      sliders: {
        priceSlider: [0, 0],
      },
      radios: {
        radio: "dongRadio",
      },
      radioDisabled: true,
      options: {
        dongOp: false,
        priceOp: true,
        aptnameOp: "",
      },
      switches: {
        sortOn: true,
        sortOff: false,
      },
      sliderOptions: {
        // start: [0, 90],
        step: 1000,
        // value: { min: this.minP, max: this.maxP },
        // range: { min: 0, max: 1000000 },
        // margin: 10,
        tooltips: true,
        // range: {
        //   min: 0,
        //   max: 100,
        // },
        format: {
          from: Number,
          to: function (value) {
            return parseInt(value) + "만원";
          },
        },
        // pips: {
        //   mode: "range",
        //   density: 5,
        //   type: "small",
        // },
        // keyboardSupport: true, // Default true
        // keyboardDefaultStep: 5, // Default 10
        // keyboardPageMultiplier: 100, // Default 5
        // keyboardMultiplier: 50, // Default 1
      },
    };
  },
  // components: {
  //   BaseSlider,
  // },
  // state의 값은 주로 computed에서 처리한다고 했음
  computed: {
    //// sidos() {
    //   // vuex의 Store가 가지고 있는 state의 "sidos"를 가져옴
    ////   return this.$store.state.sidos;
    ////},
    // 위의 것을, Map을 써서 더 간단하게 해보자 (Mapper를 사용하면 이렇게 여러개를 간편하게 구현할 수 있음)
    ...mapState(houseStore, ["sidos", "guguns", "houses", "dongs", "selectedDong"]), //+ 위의 import 부분
    // maxP: function () {
    //   let max = 1234;
    //   if (this.houses) {
    //     for (let i = 0; i < this.houses.length; i++) {
    //       if (max == null || parseInt(this.houses[i].거래금액) > parseInt(max)) max = this.houses[i].거래금액;
    //       console.log(this.houses[i].거래금액);
    //     }
    //     // this.sliders.this.sliders.priceSlider[1] = parseInt(max);
    //   }
    //   return max;
    // },
    // minP: function () {
    //   let min;
    //   for (let i = 0; i < this.houses.length; i++) {
    //     if (min == null || parseInt(this.houses[i].거래금액) < parseInt(min)) max = this.houses[i].거래금액;
    //   }
    //   console.log(min);
    //   return parseInt(min);
    //   //// return Math.min.apply(null, this.houses.);
    // },

    //todo radioDisabled: function () {
    //   return this.houses == null;
    // },
  },
  watch: {
    houses: function () {
      //! 이렇게 들어가야 계속 destroy되었다가 매번 새로운 slider가 생성될 수 있다!
      // (계속 새로 생성해야되는 이유: range 속성은 create() 때만 가능하기 떄문에)
      this.sliderVal = null;
      if (this.houses) {
        this.radioDisabled = false;
        let max = "";
        for (let i = 0; i < this.houses.length; i++) {
          if (max == null || this.houses[i].거래금액 > max) max = this.houses[i].거래금액;
          // if (min == null || this.houses[i].거래금액 < min) min = this.houses[i].거래금액;
        }
        let min = max;
        for (let i = 0; i < this.houses.length; i++) {
          // if (max == null || this.houses[i].거래금액 > max) max = this.houses[i].거래금액;
          if (min == null || this.houses[i].거래금액 < min) min = this.houses[i].거래금액;
        }
        max = parseInt(max.replace(",", ""));
        min = parseInt(min.replace(",", ""));

        this.sliderVal = [min, max];
      } else this.radioDisabled = true;
    },
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getHouseList", "getDong"]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      // "CLEAR_DONG_LIST",
      // "SET_DONG_FILTER",
      "SET_FILTERED_HOUSE_LIST",
      "CLEAR_FILTER_OPTION",
      "SET_FILTER_OPTION",
    ]),
    sidoList() {
      // 다른 페이지 갔다가 오면, 구군 리스트처럼 시도리스트도 그냥 계속 다시 얻어와져서 추가되는 것을 볼 수 있음. 알아서 해볼것
      this.CLEAR_SIDO_LIST(); // (created부분에 배치해도 되겠죠?)
      this.getSido();
    },
    // 시/도가 선택되면 호출되는 함수
    gugunList() {
      // console.log(this.sidoCode);
      // form-select 초기화 먼저 진행 (mutation 호출)
      // (원래는 이렇게 가야 함)
      //// this.$store.commit("CLEAR_GUGUN_LIST", 블라블라);
      // mapper 방식으로 간편하게 (위에 "...mapMutations([...])"부분도 잊지 말고)
      this.CLEAR_GUGUN_LIST();

      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      this.SET_FILTERED_HOUSE_LIST(null);
      if (this.gugunCode) this.getHouseList(this.gugunCode);
      // console.log(this.houses);
      this.dongList();
    },
    dongList() {
      this.CLEAR_FILTER_OPTION();
      // TODO this.CLEAR_DONG_LIST();
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    //* 11.23 아파트 이름으로 검사
    filterHouseByAptname() {
      if (this.options.aptnameOp) {
        console.log(this.options.aptnameOp);
        this.SET_FILTER_OPTION({ type: "aptname", value: this.options.aptnameOp });
      }
    },
    //* 11.22 선택 동이 바뀌었을 경우, filtering 진행
    filterHouseByDong() {
      if (this.dongCode) this.SET_FILTER_OPTION({ type: "dong", value: this.dongCode.slice(5, 10) });
      //TODO if (this.dongCode) this.SET_DONG_FILTER(this.dongCode.slice(5, 10));
    },
    //* 11.25 아파트 가격 범위 설정
    filterHouseByPrice(event) {
      console.log(event);
      this.SET_FILTER_OPTION({ type: "price", value: { min: event[0].replace("만원", ""), max: event[1].replace("만원", "") } });
      this.radios.radio = "priceRadio";
    },
    //* 11.24 아파트 가격 내림차순 정렬
    sortHouseByPrice() {},
    //* 11.25 옵션 초기화
    clearOptions() {
      this.CLEAR_FILTER_OPTION();
      // 여기는 배치를 여기서 해야 함(not computed). 아파트가 그냥 없을 수도 있기 때문에, 그 떄는 선택한 시/구군을 내버려 둬야함
      this.sidoCode = null;
      this.gugunCode = null;
      this.dongCode = null;
      this.minP = 0;
      // this.maxP: 0,
      this.options.dongOp = false;
      this.options.priceOp = false;
      this.options.aptnameOp = "";

      this.radios.radio = "dongRadio";
    },
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
    this.CLEAR_FILTER_OPTION();
  },
};
</script>

<style></style>
