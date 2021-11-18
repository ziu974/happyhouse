<template>
  <div class="regist">
    <div v-if="this.modifyAnswer != null" class="regist_form">
      <textarea id="answer" name="answer" v-model="modifyAnswer.answer" cols="35" rows="2"></textarea>
      <button class="small" @click="updateAnswerCancel">취소</button>
      <button class="small" @click="updateAnswer">수정</button>
    </div>
    <div v-else class="regist_form">
      <textarea id="answer" name="answer" v-model="answer" cols="35" rows="2"></textarea>
      <button @click="registAnswer">등록</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "AnswerWrite",
  data() {
    return {
      // 차후 작성자 이름은 로그인 구현후 로그인한 사용자로 바꾼다.
      // userid: this.account.userid,
      userid: "ssafy",
      answer: "",
    };
  },
  props: {
    qnano: { type: Number },
    modifyAnswer: { type: Object },
  },
  computed: {
    ...mapState(["account"]),
  },
  methods: {
    registAnswer() {
      http
        .post("/answer/", {
          userid: this.userid,
          answer: this.answer,
          qnano: this.qnano,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);

          // 작성글 지우기
          this.answer = "";

          // 도서평(댓글) 얻기.
          this.$store.dispatch("getAnswers", `/answer/${this.qnano}`);
        });
    },
    updateAnswer() {
      http
        .put(`/answer`, {
          no: this.modifyAnswer.no,
          answer: this.modifyAnswer.answer,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);

          // 도서평(댓글) 얻기.
          this.$store.dispatch("getAnswers", `/answer/${this.modifyAnswer.isbn}`);
          this.$emit("modify-answer-cancel", false);
        });
    },
    updateAnswerCancel() {
      this.$emit("modify-answer-cancel", false);
    },
  },
};
</script>

<style scoped>
.regist {
  padding: 10px;
}
.regist_form {
  text-align: left;
  border-radius: 5px;
  background-color: #d6e7fa;
  padding: 20px;
}

textarea {
  width: 90%;
  padding: 10px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: large;
}

button {
  float: right;
}

button.small {
  width: 60px;
  font-size: small;
  font-weight: bold;
}
</style>
