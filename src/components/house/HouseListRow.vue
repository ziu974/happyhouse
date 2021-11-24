<template>
  <li>
    <b-row class="p-3" @click="selectHouse" @mouseover="colorChange(true)" @mouseout="colorChange(false)" :class="{ 'mouse-over-bgcolor': isColor }">
      <b-col cols="3" class="text-center align-self-center description">
        <small style="color: gray"
          ><b>[{{ house.일련번호 }}]</b></small
        >
        <!-- <b-img thumbnail src="https://picsum.photos/250/250/?image=58" alt="Image 1"></b-img> -->
      </b-col>
      <b-col cols="6" class="align-self-center"
        ><b> {{ house.아파트 }} </b></b-col
      >
      <b-col cols="3" class="align-self-right"
        ><small> {{ house.전용면적 }} (m<sup>2</sup>)</small></b-col
      >
    </b-row>
  </li>
</template>

<script>
import { mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseListRow",
  data() {
    return {
      isColor: false,
    };
  },
  //// props: ["house"] (리마인드 - 비추하는 방식, type만이라도 지정하자)
  props: {
    house: Object,
  },
  created() {
    // console.log(this.house);
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse"]),
    colorChange(flag) {
      this.isColor = flag;
    },
    selectHouse() {
      this.detailHouse(this.house);
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: #dbe6f1;
}
</style>
