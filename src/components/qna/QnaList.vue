<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>질문 목록</h3></b-alert>
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
      </b-col>
    </b-row>
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
      ],
    };
  },
  created() {
    http
      .get(`/qna`)
      .then(({ data }) => {
        // console.log(data);
        if (data === "") {
          this.posts = [{ no: "1", subject: "글번호", userid: "tdClass", regtime: "234", hit: "12" }];
        } else {
          this.posts = data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "QnaWrite" });
    },
    moveView(post) {
      this.$router.push({
        name: "QnaView",
        params: { no: post.no },
      });
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
