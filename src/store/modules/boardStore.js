import { listArticle } from "@/api/board.js"; // 회원탈퇴

const boardStore = {
  namespaced: true,
  state: {
    boardList: [],
    searchWord: "",
    searchType: "subject",
    perPage: 10,
    currentPage: 1,
    start: 0,
    boardCount: 0,
  },
  getters: {},
  mutations: {
    SET_BOARD_LIST(state, response) {
      state.boardList = response;
    },
    SET_BOARD_DETAIL(state, response) {
      state.boardDetail = response;
    },

    SET_BOARD_COUNT(state, response) {
      state.boardCount = response;
    },

    SET_COMMENT_LIST(state, response) {
      state.commentList = response;
    },

    SET_COMMENT_COUNT(state, response) {
      state.commetCount = response;
    },
  },
  actions: {
    async getBoardList({ commit }, param) {
      await listArticle(
        param,
        (response) => {
          console.log("listArticle GET response : ", response.data);
          commit("SET_BOARD_COUNT", response.data.total);
          commit("SET_BOARD_LIST", response.data.list);
          // console.log(this.state.boardList);
        },
        (error) => {
          console.log("error : ", error);
        }
      );
    },
  },
};

export default boardStore;
