<template>
  <card shadow style="margin-bottom: 30px">
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="userid-group" label="작성자:" label-for="userid">
            <b-form-input id="userid" :disabled="true" v-model="article.userid" type="text" ref="userid"></b-form-input>
          </b-form-group>

          <b-form-group id="subject-group" label="제목:" label-for="subject" description="제목을 입력하세요.">
            <b-form-input
              id="subject"
              v-model="article.subject"
              type="text"
              required
              placeholder="제목 입력..."
              ref="subject"
              :state="state1"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content" description="내용을 입력하세요.">
            <b-form-textarea
              id="content"
              v-model="article.content"
              placeholder="내용 입력..."
              rows="10"
              max-rows="15"
              ref="content"
              :state="state2"
            ></b-form-textarea>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row align-v="end">
      <b-col></b-col>
      <b-col cols="auto">
        <base-button type="primary" lass="m-1" v-if="this.type === 'register'" @click="onSubmit">글작성</base-button>
        <base-button type="primary" class="m-1" v-else @click="onSubmit">글수정</base-button>
        <base-button type="primary" outline class="m-1" @click="moveList">취소</base-button>
      </b-col>
    </b-row>
  </card>
</template>

<script>
import { mapState } from "vuex";
import http from "@/util/http-common";

export default {
  name: "BoardWriteForm",
  data() {
    return {
      article: {
        articleno: 0,
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
    // userid: String,
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
  },
  created() {
    if (this.type === "modify") {
      http.get(`/board/${this.$route.params.articleno}`).then(({ data }) => {
        // this.article.articleno = data.article.articleno;
        // this.article.userid = data.article.userid;
        // this.article.subject = data.article.subject;
        // this.article.content = data.article.content;
        this.article = data;
        this.userid = this.article.userid;
      });
      this.isUserid = true;
    } else this.article.userid = this.userInfo.userid;
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      if (!this.article.subject) {
        this.state1 = false;
      }
      if (!this.article.content) {
        this.state2 = false;
      }
      if (this.article.subject && this.article.content) this.type === "register" ? this.registArticle() : this.modifyArticle();

      // this.article.userid = this.userid;

      // let err = true;
      // let msg = "";
      // !this.article.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      // err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      // err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      // if (!err) alert(msg);
      // else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.state1 = null;
      this.state2 = null;
      this.$router.push({ name: "BoardList" });
    },
    registArticle() {
      http
        .post(`/board`, {
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
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
    modifyArticle() {
      http
        .put(`/board`, {
          articleno: this.article.articleno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "BoardList" });
        });
    },
    moveList() {
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.state1 = null;
      this.state2 = null;
      this.$router.push({ name: "BoardList" });
    },
  },
};
</script>

<style></style>
