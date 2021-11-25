<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <!-- <b-alert show><h3>글보기</h3></b-alert> -->
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <base-button type="secondary" @click="listArticle">목록</base-button>
      </b-col>
      <b-col class="text-right">
        <base-button
          type="secondary"
          @click="moveModifyArticle"
          class="mr-2"
          :disabled="!isWriterId"
          v-b-popover.hover.top="'수정은 본인만 가능합니다'"
          title="Popover On Top"
          >글수정</base-button
        >
        <base-button type="secondary" @click="deleteArticle" :disabled="!isAdminId && !isWriterId">글삭제</base-button>

        <!-- <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button> -->
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <card shadow class="card-profile" no-body style="padding-top: 30px">
          <div class="mr-4"><h6 v-html="`작성일시: ${article.regtime}`" style="color: gray; font-size: smaller; text-align: end"></h6></div>
          <h3 class="mb-3" v-html="`<b>Q. ${article.subject}</b>`" style="color: #525f7f"></h3>
          <h6 v-html="`글번호: ${article.no} | 조회수: ${article.hit} | 작성자: ${article.userid} `"></h6>
          <hr style="margin: 20px" />
          <b-card-body class="text-left mb-4">
            <div v-html="message"></div>
          </b-card-body>
        </card>
        <!-- <b-card
          :header-html="`<h3>${article.articleno}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card> -->
      </b-col>
    </b-row>

    <deletion-modal></deletion-modal>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import moment from "moment";
import http from "@/util/http-common";
import DeletionModal from "@/components/modal/DeletionModal.vue";

export default {
  name: "BoardView",
  data() {
    return {
      article: {},
      modifyAnswer: Object,
      isWriterId: false,
      isAdminId: false,
    };
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
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
    DeletionModal,
  },
  created() {
    http.get(`/board/${this.$route.params.articleno}`).then(({ data }) => {
      this.article = data;
      console.log(this.article);
      //* 수정: 작성자id
      //* 삭제: 작성자id, 관리자id(admin)
      if (this.userInfo) {
        this.isWriterId = this.userInfo.userid === this.article.userid;
        this.isAdminId = this.userInfo.userid === "admin";
      }
    });
  },
  methods: {
    ...mapMutations("rootStore", ["SET_TRIGGER_DELETION_MODAL"]),

    listArticle() {
      this.$router.push({ name: "BoardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "BoardUpdate",
        params: { no: this.article.no },
      });
    },
    deleteArticle() {
      this.SET_TRIGGER_DELETION_MODAL();
      // if (confirm("정말로 삭제?")) {
      //   this.$router.replace({
      //     name: "BoardDelete",
      //     params: { articleno: this.article.articleno },
      //   });
      // }
    },
  },
};
</script>

<style></style>
