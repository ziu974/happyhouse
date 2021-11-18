<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>질문글 보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveQnaList">질문 목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveQnaUpdate" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteQnaPost">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${question.no}.
          ${question.subject} [${question.hit}]</h3><div><h6>${question.userid}</div><div>${question.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <div>
      <answer-write :qnano="this.question.no" />
      <answer-write v-if="isModifyShow && this.modifyAnswer != null" :modifyAnswer="this.modifyAnswer" @modify-answer-cancel="onModifyAnswerCancel" />
      <answer v-for="(answer, index) in answers" :key="index" :answer="answer" @modify-answer="onModifyAnswer" />
    </div>
  </b-container>
</template>

<script>
import http from "@/util/http-common";
import AnswerWrite from "@/components/qna/include/answer/AnswerWrite.vue";
import Answer from "@/components/qna/include/answer/Answer.vue";

export default {
  name: "QnaView",
  data() {
    return {
      question: null,
      answers: [],
      isModifyShow: false,
      modifyAnswer: Object,
    };
  },
  computed: {
    message() {
      if (this.question.content) return this.question.content.split("\n").join("<br>");
      return "";
    },

    // changeDateFormat() {
    //   return moment(new Date(this.article.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  components: {
    AnswerWrite,
    Answer,
  },
  created() {
    http.get(`/qna/${this.$route.params.no}`).then(({ data }) => {
      this.question = data;
      console.log(this.question.no);
      http
        .get(`/qna/answer`, { qnano: this.question.no })
        .then((data) => {
          this.answers = data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  methods: {
    moveQnaList() {
      this.$router.push({ name: "QnaList" });
    },
    moveQnaUpdate() {
      this.$router.replace({
        name: "QnaUpdate",
        params: { no: this.question.no },
      });
    },
    deleteQnaPost() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "QnaDelete",
          params: { no: this.question.no },
        });
      }
    },
    onModifyAnswer(answer) {
      this.modifyyAnswer = answer;
      this.isModifyShow = true;
    },
    onModifyyAnswerCancel(isShow) {
      this.isModifyShow = isShow;
    },
  },
};
</script>

<style></style>
