<template>
  <b-container class="mt-3">
    <p style="margin-bottom: 30px"><em>Edit Question Post</em></p>
    <question-write-form type="modify" />
  </b-container>
</template>

<script>
// import { mapState } from "vuex";
import QuestionWriteForm from "./include/QuestionWriteForm.vue";

export default {
  name: "QnaUpdate",
  components: {
    QuestionWriteForm,
  },
  computed: {
    // ...mapState("memberStore", ["userInfo"]),
  },
};
</script>

<style></style>
