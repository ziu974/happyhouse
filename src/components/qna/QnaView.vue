<template>
  <b-container class="bv-example-row mt-3 kr-text-light">
    <b-row>
      <b-col>
        <!-- <b-alert show><h3>질문글 보기</h3></b-alert> -->
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <base-button type="secondary" @click="moveQnaList">&lt; 질문 목록</base-button>
      </b-col>
      <b-col class="text-right">
        <base-button
          type="secondary"
          @click="moveQnaUpdate"
          class="mr-2"
          :disabled="!isWriterId"
          v-b-popover.hover.top="'수정은 본인만 가능합니다'"
          title="Popover On Top"
          >글수정</base-button
        >
        <base-button type="secondary" @click="deleteQnaPost" :disabled="!isAdminId && !isWriterId">글삭제</base-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <card shadow class="card-profile kr-font-light" no-body style="padding-top: 30px">
          <div class="mr-4"><h6 v-html="`작성일시: ${question.regtime}`" style="color: gray; font-size: smaller; text-align: end"></h6></div>
          <h3 class="mb-3" v-html="`<b>Q. ${question.subject}</b>`" style="color: #525f7f"></h3>
          <h6 v-html="`글번호: ${question.no} | 조회수: ${question.hit} | 작성자: ${question.userid} `"></h6>
          <!-- <b-card :header-html="`<h3>${question.no}.${question.subject} [${question.hit}]</h3><div><h6>${question.userid}</div><div>${question.regtime}</h6></div>`" class="mb-2" border-variant="dark" no-body> -->
          <!-- <div
            style="padding-top: 30px"
            v-html="
              `<h3>${question.no}.${question.subject} [${question.hit}]</h3><div><h6>${question.userid}</div><div>${question.regtime}</h6></div>`
            "
          ></div> -->
          <hr style="margin: 20px" />
          <b-card-body class="text-left mb-4">
            <div v-html="message"></div>
          </b-card-body>
        </card>
      </b-col>
    </b-row>
    <div>
      <!-- <blockquote class="blockquote"> -->
      <p class="lead text-left ml-3 mb-0">
        <strong>Answer </strong><span style="font-weight: bold">{{ answers.length }}</span>
      </p>
      <!-- </blockquote> -->
      <answer-write :qnano="this.question.no" @create-answer="onCreateAnswer" />
      <!-- <answer-write v-if="isModifyShow && this.modifyAnswer != null" :modifyAnswer="this.modifyAnswer" @modify-answer-cancel="onModifyAnswerCancel" /> -->
      <answer v-for="(answer, index) in answers" :key="index" :answer="answer" @update-answer-list="getAnswerList(answer.qnano)" />
    </div>
    <deletion-modal></deletion-modal>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import http from "@/util/http-common";
import AnswerWrite from "@/components/qna/include/answer/AnswerWrite.vue";
import Answer from "@/components/qna/include/answer/Answer.vue";
import DeletionModal from "@/components/modal/DeletionModal.vue";

export default {
  name: "QnaView",
  data() {
    return {
      question: {
        no: 0,
        subject: "",
        hit: "",
        userid: "",
        content: "",
        answered: false,
      },
      answers: [],
      // isModifyShow: false,
      modifyAnswer: Object,
      isWriterId: false,
      isAdminId: false,
    };
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
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
  watch: {
    userInfo: function () {
      if (this.userInfo) {
        this.isWriterId = this.userInfo.userid === this.question.userid;
        this.isAdminId = this.userInfo.userid === "admin";
      } else {
        this.isWriterId = false;
        this.isAdminId = false;
      }
    },
  },
  components: {
    AnswerWrite,
    Answer,
    DeletionModal,
  },
  created() {
    http.get(`/qna/${this.$route.params.no}`).then(({ data }) => {
      this.question = data;
      //* 수정: 작성자id
      //* 삭제: 작성자id, 관리자id(admin)
      if (this.userInfo) {
        this.isWriterId = this.userInfo.userid === this.question.userid;
        this.isAdminId = this.userInfo.userid === "admin";
      }
      console.log(this.question);
      //* 댓글 목록 가져오기
      this.getAnswerList(data.no);
      // http
      //   .get(`/qna/answer/${data.no}`)
      //   .then((data) => {
      //     this.answers = data.data;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    });
  },
  methods: {
    ...mapMutations("rootStore", ["SET_TRIGGER_DELETION_MODAL"]),

    moveQnaList() {
      this.$router.push({ name: "QnaList" });
    },
    moveQnaUpdate() {
      this.$router.replace({
        name: "QnaUpdate",
        params: { no: this.question.no },
      });
    },
    getAnswerList(qnano) {
      http
        .get(`/qna/answer/${qnano}`)
        .then((data) => {
          this.answers = data.data;
          // console.log(data.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteQnaPost() {
      this.SET_TRIGGER_DELETION_MODAL();
      // if (confirm("정말로 삭제?")) {
      //   this.$router.replace({
      //     name: "QnaDelete",
      //     params: { no: this.question.no },
      //   });
      // }
    },
    onCreateAnswer() {
      this.isModifyShow = false;
      this.getAnswerList(this.question.no);
    },
    // onModifyAnswer(answer) {
    // this.modifyAnswer = answer;
    // this.isModifyShow = true;
    //   this.getAnswerList(this.question.no);
    // },
    // onModifyAnswerCancel(isShow) {
    // this.isModifyShow = isShow;
    //   this.getAnswerList(this.question.no);
    // },
  },
};
</script>

<style></style>
