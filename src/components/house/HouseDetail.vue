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
    <div class="col-md-6">
      <div class="card bg-default shadow border-0">
        <img class="card-img-top" data-src="img/theme/img-1-1200x1000.jpg" src="img/theme/img-1-1200x1000.jpg" lazy="loaded" />
        <blockquote class="card-blockquote">
          <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" class="svg-bg">
            <polygon points="0,52 583,95 0,95" class="fill-default"></polygon>
            <polygon points="0,42 583,95 683,0 0,95" opacity=".2" class="fill-default"></polygon>
          </svg>
          <h4 class="display-3 font-weight-bold text-white">Design System</h4>
          <p class="lead text-italic text-white">
            The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever happens.
          </p>
        </blockquote>
      </div>
    </div>
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
