<template>
  <modal :show.sync="modals.deletePostModal" gradient="warning" modal-classes="modal-danger modal-dialog-centered">
    <h6 slot="header" class="modal-title" id="modal-title-notification">Delete</h6>

    <div class="py-3 text-center">
      <i class="fa fa-exclamation-triangle fa-5x"></i>
      <h3 class="heading mt-4 mb-3">Warning!</h3>
      <p>글을 삭제할 경우 복구가 불가능하며 모든 답변은 삭제됩니다. 그래도 삭제하시겠습니까?</p>
    </div>

    <template slot="footer">
      <base-button type="white" @click="deleteUser">Yes, Delete Anyway</base-button>
      <base-button type="link" text-color="white" class="ml-auto" @click="modals.deleteUserModal = false"> Cancel </base-button>
    </template>
  </modal>
</template>

<script>
import { mapState } from "vuex";
import Modal from "@/components/ui/Modal.vue";
import http from "@/util/http-common";

export default {
  name: "LoginModal",
  data() {
    return {
      modals: {
        deletePostModal: false,
      },
    };
  },
  components: {
    Modal,
  },
  computed: {
    ...mapState("rootStore", ["showDeletionModal"]),
  },
  watch: {
    showDeletionModal: function () {
      this.modals.deletePostModal = true;
    },
  },
  methods: {
    deleteUser() {
      http.delete(`/qna/${this.$route.params.no}`).then(({ data }) => {
        if (data === "success") {
          // 현재 route를 /list로 변경.
          this.$router.replace({
            name: "QnaList",
          });
        } else alert("삭제 처리시 문제가 발생했습니다.");
      });
      // this.$router.replace({
      //   name: "QnaList",
      // });
      // if (confirm("정말로 삭제?")) {
      //   this.$router.replace({
      //     name: "QnaDelete",
      //     params: { no: this.question.no },
      //   });
      // }
      // if (confirm("정말 회원탈퇴를 하시겠습니까? 작성하신 모든 글은 삭제됩니다. (복구불가능)")) {
      //   this.deleteUserAccount(this.userInfo.userid);
      //   this.logout();
      //   this.$router.push({ name: "Home" });
      // }
    },
  },
};
</script>

<style></style>
