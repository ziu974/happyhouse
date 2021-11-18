<template>
  <div v-show="isShow" class="comment">
    <div class="head">{{ comment.user_name }} ({{ comment.comment_time }})</div>
    <div class="content" v-html="enterToBr(comment.comment)"></div>
    <!-- 로그인 기능 구현 후 로그인한 자신의 글에만 보이게 한다. -->
    <div class="cbtn"><label @click="modifyCommentView">수정</label> | <label @click="deleteComment">삭제</label></div>
  </div>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "comment",
  data() {
    return {
      isShow: true
    };
  },
  props: {
    comment: Object
  },
  methods: {
    modifyCommentView() {
      this.$emit("modify-comment", {
        comment_no: this.comment.comment_no,
        comment: this.comment.comment,
        isbn: this.comment.isbn
      });
    },
    deleteComment() {
      if (confirm("정말로 삭제?")) {
        http.delete(`/comment/${this.comment.comment_no}`).then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          // 도서평(댓글) 얻기.
          this.$store.dispatch("getComments", `/comment/${this.comment.isbn}`);
        });
      }
    },
    enterToBr(str) {
      if (str) return str.replace(/(?:\r\n|\r|\n)/g, "<br />");
    }
  }
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
