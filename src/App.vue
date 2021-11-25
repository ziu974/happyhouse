<template>
  <div id="app" style="width: 100vw">
    <!-- <navi-bar /> -->
    <!-- <b-img id="page-header-img" min-width="100vw" height="400px" style="crop" src="https://images.unsplash.com/photo-1633113088942-99089f4abffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" /> -->
    <!-- <router-view /> -->

    <!--  11.21 UI 테스트 부분  -->
    <header>
      <navigation-bar name="header"></navigation-bar>
    </header>
    <!-- <v-layout fill-height style="background-color: magenta; height: 100%"> -->
    <main style="height: 100%">
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <!-- </v-layout> -->
    <footer-comp name="footer"></footer-comp>
    <!-- <login-modal :show.sync="showLoginModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm"> </login-modal> -->
  </div>
</template>

<script>
// import { mapState } from "vuex";
// import NaviBar from "./components/layout/NaviBar.vue";
import NavigationBar from "./components/layout/AppHeader.vue";
import { FadeTransition } from "vue2-transitions";
import FooterComp from "./components/layout/AppFooter.vue";
// import LoginModal from "@/components/user/LoginModal.vue";

export default {
  name: "App",
  components: {
    // NaviBar,
    NavigationBar,
    FadeTransition,
    FooterComp,
    // LoginModal,
  },
  computed: {
    // ...mapState("rootStore", ["showLoginModal"]),
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;700&display=swap");

.kr-font-thin {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 100;
}
.kr-font-light {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 300;
}
.kr-font-regular {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
}
.kr-font-bold {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
}
a:hover {
  text-decoration: none;
  font-weight: bold;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
