<template>
  <b-container class="bv-example-row" v-if="house">
    <b-row>
      <b-col
        ><h3>{{ house.아파트 }}</h3></b-col
      >
    </b-row>
    <b-row class="mb-2 mt-1">
      <b-col><b-img :src="require('@/assets/apt.png')" fluid-grow></b-img> <kakao-map></kakao-map></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary">일련번호 : {{ house.일련번호 }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="primary">아파트 이름 : {{ house.아파트 }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info">법정동 : {{ house.법정동 }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="warning">층수 : {{ house.층 }}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <!-- 숫자처리 -> n만원을 원으로 바꾸고(","제거 후 만 곱하기), 다시 filter적용 -->
        <b-alert show variant="danger">거래금액 : {{ (parseInt(house.거래금액.replace(",", "")) * 10000) | price }}원</b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

import KakaoMap from "@/components/house/map/HouseMap.vue";
// const houseStore = "houseStore";

export default {
  name: "HouseDetail",
  components: {
    KakaoMap,
  },
  // vuex의 state에서 house객체 data를 가져오자
  computed: {
    ...mapState("houseStore", ["house"]),
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
