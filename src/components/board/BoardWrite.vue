<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글작성</h3></b-alert>
      </b-col>
    </b-row>
    <board-write-form type="register" :userid="userInfo.userid" />
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import BoardWriteForm from "./child/BoardWriteForm.vue";

const memberStore = "memberStore";

export default {
  name: "BoardWrite",
  components: {
    BoardWriteForm,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
};
</script>

<style></style>
