import jwt_decode from "jwt-decode";
import { login } from "@/api/member.js";
import { findById } from "../../api/member";
import { modifyInfo } from "@/api/member.js"; // 회원수정
import { deleteId } from "@/api/member.js"; // 회원탈퇴
import { createId } from "@/api/member.js"; // 회원탈퇴

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      // 수정된 회원정보 갱신
      state.userInfo = userInfo;
    },
  },
  // TODO + (여기에서는 아니지만,CORS 문제 해결 (플러그인 쓰는 임시방편 말고)) -> 서버코드의 WebConfig.java 보자
  //!비동기 처리: axios 사용해서 axios.get(url) 이런식으로 했었음
  // !근데 우리는 공공데이터 + 우리서버(url/http-common.) 각각 다름 => 그래서 이렇게 바꿈!!
  // (houseStore.js gugunList()가보자)
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {}
      );
    },
    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      findById(
        decode_token.userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    logout({ commit }) {
      console.log("로그아웃");
      commit("SET_IS_LOGIN", false);
      commit("SET_USER_INFO", null);
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
    createUserAccount({ commit }, userInfo) {
      createId(userInfo, (response) => {
        if (response.data === "success") {
          console.log(commit + "성공");
        } else {
          alert("회원가입 실패");
          console.log(response.data);
        }
      });
    },
    updateUserInfo({ commit }, userInfo) {
      modifyInfo(userInfo, (response) => {
        if (response.data.message === "success") {
          commit("SET_USER_INFO", userInfo);
          // TODO 이 부분 필요할까? => 토큰 갱신?
          // let token = response.data["access-token"];
          // commit("SET_IS_LOGIN", true);
          // commit("SET_IS_LOGIN_ERROR", false);
          // sessionStorage.setItem("access-token", token);
        } else {
          console.log(response.data);
          // commit("SET_IS_LOGIN", false);
          // commit("SET_IS_LOGIN_ERROR", true);
        }
      });
    },
    deleteUserAccount({ commit }, userid) {
      deleteId(userid, (response) => {
        if (response.data === "success") {
          commit("SET_IS_LOGIN", false);
          commit("SET_USER_INFO", null);
        } else {
          console.log(response.data);
        }
      });
    },
  },
};

export default memberStore;
