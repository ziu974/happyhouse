<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <!-- <b-alert show><h3>질문 목록</h3></b-alert> -->
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">질문하기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="posts" :fields="fields" @row-clicked="moveView"> </b-table>
        <b-pagination v-model="currentPage" :total-rows="totalCount" :per-page="perPage" aria-controls="my-table" @page-click="pageClick" align="center"></b-pagination>
      </b-col>
    </b-row>
    <!-- Pagination 적용 부분 -->
  </b-container>
</template>

<script>
import http from "@/util/http-common";

export default {
  name: "QnaList",
  components: {
    // BoardListRow,
  },
  data() {
    return {
      posts: [],
      fields: [
        { key: "no", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
        { key: "bg", label: "시험삼아", tdClass: "tdClass" },
      ],
      // pagination 관련
      perPage: 10,
      currentPage: 1,
      start: 0,
      totalCount: 0,
    };
  },
  created() {
    this.getList();
    //   http
    //     .get(`/qna`)
    //     .then(({ data }) => {
    //       // console.log(data);
    //       if (data === "") {
    //         this.posts = [{ no: "1", subject: "글번호", userid: "tdClass", regtime: "234", hit: "12" }];
    //       } else {
    //         this.posts = data;
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
  },
  methods: {
    getList() {
      http
        .get(`/qna`, { key: "subject", pg: this.currentPage, spp: this.perPage, start: this.start, word: "" })
        .then(({ data }) => {
          console.log(data);
          if (data === "") {
            // 글 없을 떄
            this.posts = [{ no: "1", subject: "글번호", userid: "tdClass", regtime: "234", hit: "12" }];
          } else {
            this.totalCount = data.total;
            this.posts = data.list;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // this.getBoardList({ key: "subject", pg: this.currentPage, spp: this.perPage, start: this.start, word: "" });
    },
    moveWrite() {
      this.$router.push({ name: "QnaWrite" });
    },
    moveView(post) {
      this.$router.push({
        name: "QnaView",
        params: { no: post.no },
      });
    },
    pageClick: function (button, page) {
      this.currentPage = page;
      this.getList();
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
