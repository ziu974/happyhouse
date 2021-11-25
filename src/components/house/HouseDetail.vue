<template>
  <div>
    <div v-if="selectedHouse">
      <h3 class="mb-4">{{ selectedHouse.아파트 }}</h3>
      <!-- <b-img :src="require('@/assets/apt.png')" fluid-grow></b-img> -->
      <p class="description text-left">
        일련번호 : {{ selectedHouse.일련번호 }} <br />
        아파트 이름 : {{ selectedHouse.아파트 }}<br />
        법정동 : {{ selectedHouse.법정동 }} <br />층수 : {{ selectedHouse.층 }} <br />
        거래금액 : {{ (parseInt(selectedHouse.거래금액.replace(",", "")) * 10000) | price }}원<br />
        건축년도: {{ selectedHouse.건축년도 }}(년)<br />
        전용면적: {{ Math.round(selectedHouse.전용면적 * 100) / 100 }} m<sup>2</sup> ({{
          Math.round((selectedHouse.전용면적 / 3.3) * 10) / 10
        }}평)<br />
      </p>
    </div>
    <div class="text-center text-muted" v-else>(선택 항목 없음)</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "HouseDetail",
  // vuex의 state에서 house객체 data를 가져오자
  computed: {
    ...mapState("houseStore", ["selectedHouse"]),
  },
  created() {
    this.CLEAR_DETAIL_HOUSE();
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  methods: {
    ...mapMutations("houseStore", ["CLEAR_DETAIL_HOUSE"]),
  },
};
</script>

<style></style>
