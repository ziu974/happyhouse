import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Landing.vue";
// import Instagram from "@/views/Instagram.vue";

import Guide from "@/views/Guide.vue";
import AboutUs from "@/views/AboutUs.vue";

import Member from "@/views/Member.vue";
import MemberLogin from "@/components/user/MemberLogin.vue";
import MemberJoin from "@/components/user/MemberJoin.vue";
import MemberMyPage from "@/components/user/MemberMyPage.vue";

import Board from "@/views/Board.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardView from "@/components/board/BoardView.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";
import BoardDelete from "@/components/board/BoardDelete.vue";

import Qna from "@/views/Qna.vue";
import QnaList from "@/components/qna/QnaList";
import QnaWrite from "@/components/qna/QnaWrite";
import QnaView from "@/components/qna/QnaView";
import QnaUpdate from "@/components/qna/QnaUpdate";
import QnaDelete from "@/components/qna/QnaDelete";

import House from "@/views/House.vue";

import store from "@/store/index.js";

// TODO
// UI 적용부분(testing) - 여기에서 바꿔가며 테스트 중
import Test from "@/components/fund/VueFormWizardEx.vue";
// import Test from "@/components/fund/Temp.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
// import Profile from "@/views/Profile.vue";

Vue.use(VueRouter);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // 이거 주석 풀어서 확인해보자 -> getters, _actions 부분 확인
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "SignIn" });
    router.push({ name: "Login" });
  } else {
    console.log("로그인 했다.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/guide",
    name: "Guide",
    component: Guide,
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
  },
  // {
  //   path: "/instagram",
  //   name: "Instagram",
  //   beforeEnter: onlyAuthUser,
  //   component: Instagram,
  // },
  {
    path: "/user",
    name: "Member",
    component: Member,
    children: [
      {
        path: "signin",
        name: "SignIn",
        component: MemberLogin,
      },
      {
        path: "signup",
        name: "SignUp",
        component: MemberJoin,
      },
      {
        path: "mypage",
        name: "MyPage",
        beforeEnter: onlyAuthUser,
        component: MemberMyPage,
      },
    ],
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "BoardList",
        component: BoardList,
      },
      {
        path: "write",
        name: "BoardWrite",
        beforeEnter: onlyAuthUser,
        component: BoardWrite,
      },
      {
        path: "detail/:articleno",
        name: "BoardView",
        component: BoardView,
      },
      {
        path: "update/:articleno",
        name: "BoardUpdate",
        beforeEnter: onlyAuthUser,
        component: BoardUpdate,
      },
      {
        path: "delete/:articleno",
        name: "BoardDelete",
        beforeEnter: onlyAuthUser,
        component: BoardDelete,
      },
    ],
  },
  {
    path: "/qna",
    name: "Qna",
    component: Qna,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "QnaList",
        component: QnaList,
      },
      {
        path: "write",
        name: "QnaWrite",
        beforeEnter: onlyAuthUser,
        component: QnaWrite,
      },
      {
        path: "detail/:no",
        name: "QnaView",
        component: QnaView,
      },
      {
        path: "update/:no",
        name: "QnaUpdate",
        beforeEnter: onlyAuthUser,
        component: QnaUpdate,
      },
      {
        path: "delete/:no",
        name: "QnaDelete",
        beforeEnter: onlyAuthUser,
        component: QnaDelete,
      },
    ],
  },
  {
    path: "/house",
    name: "House",
    component: House,
  },
  {
    path: "/uitesting",
    name: "Test",
    component: Test,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    component: MemberMyPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
