<template>
  <card shadow class="mb-5">
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="userid-group" label="작성자:" label-for="userid">
            <b-form-input id="userid" :disabled="true" v-model="question.userid" type="text" required placeholder="작성자 입력..."></b-form-input>
          </b-form-group>

          <b-form-group id="subject-group" label="제목:" label-for="subject" description="제목을 입력하세요.">
            <b-form-input
              id="subject"
              v-model="question.subject"
              type="text"
              placeholder="제목 입력..."
              refs="subject"
              :state="state1"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content" description="내용을 입력하세요.">
            <b-textarea
              id="content"
              class="form-control"
              v-model="question.content"
              placeholder="내용 입력..."
              rows="10"
              refs="content"
              :state="state2"
            ></b-textarea>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row align-v="end">
      <b-col></b-col>
      <b-col cols="auto">
        <base-button type="primary" class="m-1" v-if="this.type === 'register'" @click="onSubmit">글작성</base-button>
        <base-button type="primary" class="m-1" v-else>글수정</base-button>
        <base-button type="primary" outline class="m-1" @click="moveList">취소</base-button>
      </b-col>
    </b-row>
  </card>
</template>

<script>
import { mapState } from "vuex";
import http from "@/util/http-common";
import Card from "../../ui/Card.vue";

export default {
  components: { Card },
  name: "WriteForm",
  data() {
    return {
      question: {
        no: 0,
        userid: "",
        subject: "",
        content: "",
      },
      isUserid: false,
      err: false,
      state1: null,
      state2: null,
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
    // state() {
    //   return this.question.subject.length > 0 && this.question.content.length > 0;
    // },
    // invalidFeedback() {
    //   if (this.question.subject || this.question.content) {
    //     return "Enter at least 4 characters.";
    //   }
    //   return "Please enter something.";
    // },
  },
  created() {
    if (this.type === "modify") {
      http.get(`/qna/${this.$route.params.no}`).then(({ data }) => {
        // this.article.articleno = data.article.articleno;
        // this.article.userid = data.article.userid;
        // this.article.subject = data.article.subject;
        // this.article.content = data.article.content;
        this.question = data;
        this.userid = this.question.userid;
      });
      this.isUserid = true;
    } else this.question.userid = this.userInfo.userid;
    //this.state1 = null;
    //this.state2 = null;
  },
  methods: {
    onSubmit(event) {
      console.log("lskjf");
      event.preventDefault();

      if (!this.question.subject) {
        this.state1 = false;
      }
      if (!this.question.content) {
        this.state2 = false;
      }

      if (this.question.subject && this.question.content) this.type === "register" ? this.registQuestion() : this.modifyQuestion();

      // let err = true;
      // let msg = "";
      // !this.question.userid;
      // err && !this.question.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      // err && !this.question.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      // if (!err) alert(msg);
      // else this.type === "register" ? this.registQuestion() : this.modifyQuestion();
    },
    onReset(event) {
      event.preventDefault();
      this.question.no = 0;
      this.question.subject = "";
      this.question.content = "";
      this.state1 = null;
      this.state2 = null;
      this.$router.push({ name: "QnaList" });
    },
    registQuestion() {
      http
        .post(`/qna`, {
          userid: this.question.userid,
          subject: this.question.subject,
          content: this.question.content,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },
    modifyQuestion() {
      http
        .put(`/qna`, {
          no: this.question.no,
          userid: this.question.userid,
          subject: this.question.subject,
          content: this.question.content,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "QnaList" });
        });
    },
    moveList() {
      this.$router.push({ name: "QnaList" });
    },
  },
};
</script>

<style></style>
