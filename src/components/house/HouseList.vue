<template>
  <!-- TODO "apts" -> "houses"(vuex의 state에서의 이름!) 으로 -->
  <b-container v-if="filteredHouses && filteredHouses.length != 0" class="bv-example-row mt-3">
    <!-- "house-list-row"자식 component에게 주택data를, Object 타입으로 전달할 것이므로, v-bind(":")필요 => ':house' 부분-->
    <!-- (이제 HouseListRow.vue를 가보자) -->

    <b-list-group id="my-table" class="mb-4" style="list-style: none">
      <!-- <li id="my-table"> -->
      <house-list-row v-for="(house, index) in subList" :key="index" :house="house" />
      <!-- </li> -->
    </b-list-group>
    <!-- Pagination 적용 부분 -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      @page-click="pageClick"
      align="center"
    ></b-pagination>
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><base-alert outline type="default" align="center" show style="background-color: #8898aa">No match</base-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
// 이제 emit, props 해서 component간의 통신을 하는 것이 아니라,
//! Vuex의 state에서 아파트 목록 data를 가져와야 됨
import { mapState, mapMutations } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListRow,
  },
  data() {
    return {
      // filter관련
      filterOp: null,

      // houselist: [],
      // pagination 관련
      perPage: 8,
      currentPage: 1,
      start: 0,
      totalCount: 0,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses", "filterOption"]),
    filteredHouses: function () {
      if (this.filterOp) {
        if (this.filterOp.type === "dong") {
          //// console.log(this.filterOptions.selectedDong);
          return this.houses.filter((house) => house.법정동읍면동코드 == this.filterOp.value);
        } else if (this.filterOp.type === "aptname") {
          return this.houses.filter((house) => house.아파트.includes(this.filterOp.value.trim()));
        } else if (this.filterOp.type === "price") {
          console.log(this.filterOp.value);
          const min = parseInt(this.filterOp.value.min);
          const max = parseInt(this.filterOp.value.max);
          // console.log(min);
          // console.log(this.houses[0].거래금액.replace(",", ""));
          // return this.houses;
          return this.houses.filter((house) => house.거래금액.replace(",", "") >= min && house.거래금액.replace(",", "") <= max);
          // } else if (this.filterOp.sortPrice) {
          //   return this.houses.sort((a, b) => {
          //     return b.거래가 - a.거래가;
          //   });
        } else return this.houses;
      } else return this.houses;
    },

    // currentPage에 해당하는 것
    subList: function () {
      return this.filteredHouses.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
    },
    rows() {
      if (this.filterOp) {
        return this.filteredHouses.length;
      } else {
        return this.houses.length;
      }
    },
  },
  watch: {
    filterOption: function () {
      console.log(this.filteredHouses);
      this.filterOp = this.filterOption;
      // this.filterHouse();
    },
    // currentPage: function () {
    //   this.subList = this.filteredHouses.slice(this.currentPage * this.perPage, (this.currentPage + 1) * this.perPage);
    //   console.log(this.subList);
    //   console.log(this.subList);
    // },
  },
  created() {
    // TODO 현재 목록 비우기
    this.CLEAR_HOUSE_LIST();
  },
  methods: {
    ...mapMutations(houseStore, ["CLEAR_HOUSE_LIST", "SET_FILTERED_HOUSE_LIST"]),
    pageClick: function (button, page) {
      this.currentPage = page;
      // this.subList = this.filteredHouses.slice(this.currentPage * this.perPage, (this.currentPage + 1) * this.perPage);
      // console.log(this.subList);
    },
  },
};
</script>

<style></style>
