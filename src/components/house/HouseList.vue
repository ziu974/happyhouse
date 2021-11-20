<template>
  <!-- TODO "apts" -> "houses"(vuex의 state에서의 이름!) 으로 -->
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <!-- "house-list-row"자식 component에게 주택data를, Object 타입으로 전달할 것이므로, v-bind(":")필요 => ':house' 부분-->
    <!-- (이제 HouseListRow.vue를 가보자) -->
    <house-list-row v-for="(house, index) in houses" :key="index" :house="house" />
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
// 이제 emit, props 해서 component간의 통신을 하는 것이 아니라,
//! Vuex의 state에서 아파트 목록 data를 가져와야 됨
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListRow,
  },
  data() {
    return {
      //// apts: ["a"],
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },
  created() {
    // TODO 현재 목록 비우기
  },
};
</script>

<style></style>
