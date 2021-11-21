<template>
  <b-container class="bv-example-row mt-3">
    <!-- <b-row>
      <b-col>
        <h1 class="display-3">Board</h1>
      </b-col>
    </b-row> -->
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="boardList.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="borderless">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <board-list-row v-for="(article, index) in boardList" :key="index" v-bind="article" />
          </tbody>
        </b-table-simple>
      </b-col>
      <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
    </b-row>
    <!-- Pagination 적용 부분 -->
    <b-pagination v-model="currentPage" :total-rows="boardCount" :per-page="perPage" aria-controls="my-table" @page-click="pageClick" align="center"></b-pagination>
  </b-container>
</template>

<script>
// import http from "@/util/http-common";
import { mapState, mapActions } from "vuex";
import BoardListRow from "@/components/board/child/BoardListRow";

const boardStore = "boardStore";

export default {
  name: "BoardList",
  components: {
    BoardListRow,
  },
  data() {
    return {
      articles: [],
      perPage: 10,
      currentPage: 1,
      start: 0,
    };
  },
  created() {
    this.getList();

    // TODO 임시로 꺼둠
    // http.get(`/board`).then(({ data }) => {
    //   console.log(data);
    //   this.articles = data;
    // });
  },
  computed: {
    ...mapState(boardStore, ["boardList", "boardCount"]),
  },
  methods: {
    ...mapActions(boardStore, ["getBoardList"]),
    // moveWrite() {
    //   this.$router.push({ name: "BoardWrite" });
    // },

    moveWrite() {
      this.$router.push({ name: "BoardWrite" });
    },

    getList() {
      this.getBoardList({ key: "subject", pg: this.currentPage, spp: this.perPage, start: this.start, word: "" });
    },

    viewArticle(article) {
      this.$router.push({
        name: "BoardView",
        params: { articleno: article.articleno },
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
