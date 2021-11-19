<template>
  <div v-show="isShow" class="comment">
    <div class="head">{{ answer.userid }} ({{ answer.regtime }})</div>
    <div class="content" v-html="enterToBr(answer.content)"></div>
    <!-- 로그인 기능 구현 후 로그인한 자신의 글에만 보이게 한다. -->
    <div class="cbtn"><label @click="modifyAnswerView">수정</label> | <label @click="deleteAnswer">삭제</label></div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "Answer",
  data() {
    return {
      isShow: true,
    };
  },
  props: {
    answer: Object,
  },
  methods: {
    modifyAnswerView() {
      // TODO
      console.log("여기 고쳐야됨");
      this.$emit("modify-comment", {
        no: this.answer.no,
        content: this.answer.content,
        // isbn: this.anwer.isbn
      });
    },
    deleteAnswer() {
      if (confirm("댓글을 정말로 삭제하시겠습니까?")) {
        http.delete(`/qna/answer/${this.answer.no}`).then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          // 도서평(댓글) 얻기.
          // TODO 이부분 구현해야됨 (댓글 다시 받아오기)
        });
      }
    },
    enterToBr(str) {
      if (str) return str.replace(/(?:\r\n|\r|\n)/g, "<br />");
    },
  },
};
</script>

<style>
.comment {
  text-align: left;
  border-radius: 5px;
  background-color: #d6e7fa;
  padding: 10px 20px;
  margin: 10px;
}
.head {
  font-weight: bold;
  margin-bottom: 5px;
}
.content {
  padding: 5px;
}
.cbtn {
  text-align: right;
  color: steelblue;
  margin: 5px 0px;
}
</style>
