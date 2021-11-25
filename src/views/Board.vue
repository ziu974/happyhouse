<template>
  <div class="text-center" :class="{ 'blue-bg': isBoardWrite }" style="padding-top: 140px; padding-bottom: 150px; height: 100%">
    <!-- <b-container class="bv-example-row mt-3 text-center" style="margin-bottom: 80px"> -->
    <h1 class="display-3" style="color: #525f7f; margin-bottom: 40px">Board</h1>
    <!-- <h3 class="underline-hotpink"><b-icon icon="journals"></b-icon> Board Service</h3> -->
    <router-view></router-view>
    <!-- </b-container> -->
  </div>
</template>
<script>
export default {
  name: "Board",
  computed: {
    isBoardWrite: function () {
      return this.$route.path === "/board/write" || this.$route.path.includes("/update");
    },
  },
};
</script>
<style scoped>
.blue-bg {
  background-color: rgb(140, 157, 212);
}
</style>
