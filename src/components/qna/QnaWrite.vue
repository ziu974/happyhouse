<template>
  <b-container class="mt-3 mb-5">
    <b-row>
      <b-col>
        <!-- <b-alert show><h3>질문글 작성</h3></b-alert> -->
      </b-col>
    </b-row>
    <question-write-form type="register" :userid="userInfo.userid" />
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import QuestionWriteForm from "./include/QuestionWriteForm.vue";

export default {
  name: "QnaWrite",
  components: {
    QuestionWriteForm,
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
  },
};
</script>

<style></style>
