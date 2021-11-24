<template>
  <div>
    <div v-if="this.modifyAnswer != null" class="regist_form">
      <textarea
        id="modanswer"
        class="form-control form-control-alternative"
        name="answer"
        v-model="modifyAnswer.content"
        cols="35"
        rows="2"
        style="border-radius: 10px"
      ></textarea>
      <div class="cbtn"><span @click="updateAnswer">수정 완료</span> | <span @click="updateAnswerCancel">취소</span></div>
      <!-- <b-button class="small" @click="updateAnswerCancel">취소</b-button>
      <b-button class="small" @click="updateAnswer">수정</b-button> -->
    </div>
    <div v-else class="regist_form">
      <b-row>
        <b-col align-self="baseline">
          <textarea
            id="answer"
            class="form-control ml-3 mr-2"
            name="answer"
            v-model="content"
            cols="35"
            rows="2"
            style="border-radius: 10px"
          ></textarea>
        </b-col>
        <b-col align-self="center" cols="auto">
          <base-button type="primary" @click="registAnswer">등록</base-button>
        </b-col>
      </b-row>
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
      // userid: "ssafy",
      content: "",
      modals: {
        // modal0,
      },
    };
  },
  props: {
    qnano: { type: Number },
    modifyAnswer: { type: Object },
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
  },
  methods: {
    registAnswer() {
      http
        .post("/qna/answer/", {
          userid: this.userInfo.userid,
          content: this.content,
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
          this.$emit("create-answer");
        });
    },
    updateAnswer() {
      http
        .put(`/qna/answer`, {
          no: this.modifyAnswer.no,
          content: this.modifyAnswer.content,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);

          // 도서평(댓글) 얻기.
          this.$emit("modify-answer-finish", true); // 2번쨰 파라미터: 서버에서 댓글리스트 갱신 필요여부
        });
    },
    updateAnswerCancel() {
      this.$emit("modify-answer-finish", false);
    },
  },
};
</script>

<style scoped>
/* .regist {
  padding: 10px;
} */
/* .regist_form {
  text-align: left;
  border-radius: 5px;
  background-color: #d6e7fa;
  padding: 20px;
} */

textarea {
  /* width: 100%; */
  margin: 8px 0;
  display: inline-block;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
  box-sizing: border-box;
  color: #787878;
  font-size: medium;
}
.cbtn {
  text-align: right;
  color: steelblue;
  margin: 5px 0px;
}
</style>
