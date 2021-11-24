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
        <b-table striped hover :items="posts" :fields="fields" @row-clicked="moveView" show-empty>
          <template #cell(answered)="data">
            <badge type="secondary" v-if="data.item.answered">answered</badge>
            <badge type="default" v-else>waiting</badge>
            <!-- <b-button size="sm" class="mr-1"> Info modal </b-button>
            <b-button size="sm"> Details{{ row.No }} </b-button> -->
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalCount"
          :per-page="perPage"
          aria-controls="my-table"
          @page-click="pageClick"
          align="center"
        ></b-pagination>
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
        { key: "no", label: "No.", tdClass: "tdClass" },
        { key: "subject", label: "Title", tdClass: "tdSubject" },
        { key: "userid", label: "User", tdClass: "tdClass" },
        { key: "regtime", label: "Time", tdClass: "tdClass" },
        { key: "hit", label: "Viewed", tdClass: "tdClass" },
        {
          key: "answered",
          label: "Answered",
          tdClass: "tdClass",
          // formatter: (value) => {
          //   return value ? "Answered" : "waiting..";
          // },
          sortable: true,
        },
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
            // this.posts = [{ no: "1", subject: "글번호", userid: "tdClass", regtime: "234", hit: "12"}];
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
