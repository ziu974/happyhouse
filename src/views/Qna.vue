<template>
  <div class="text-center" :class="{ 'blue-bg': isQnaWrite }" style="padding-top: 140px; padding-bottom: 150px; height: 100%">
    <!-- <b-container class="bv-example-row mt-3 text-center" style="background-color: rgb(171, 180, 209); height: 100%"> -->
    <h1 class="display-3" style="color: #525f7f; margin-bottom: 40px">QnA</h1>
    <!-- <h3 class="underline-hotpink"><b-icon icon="question"></b-icon>QnA Service</h3> -->
    <router-view></router-view>
    <!-- </b-container> -->
  </div>
</template>
<script>
export default {
  name: "Qna",
  computed: {
    isQnaWrite: function () {
      // console.log(this.$route.path);
      return this.$route.path === "/qna/write" || this.$route.path.includes("/update");
    },
  },
};
</script>
<style scoped>
.blue-bg {
  background-color: rgb(140, 157, 212);
}
</style>
