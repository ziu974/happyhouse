<template>
  <b-container class="mt-3">
    <p style="margin-bottom: 30px"><em>Edit Board Post</em></p>
    <board-write-form type="modify" />
  </b-container>
</template>

<script>
import BoardWriteForm from "./child/BoardWriteForm.vue";

export default {
  name: "BoardUpdate",
  components: {
    BoardWriteForm,
  },
};
</script>

<style></style>
