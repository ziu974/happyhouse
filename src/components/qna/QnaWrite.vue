<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>질문글 작성</h3></b-alert>
      </b-col>
    </b-row>
    <question-write-form type="register" />
  </b-container>
</template>

<script>
import QuestionWriteForm from "./include/QuestionWriteForm.vue";

export default {
  name: "QnaWrite",
  components: {
    QuestionWriteForm,
  },
};
</script>

<style></style>
