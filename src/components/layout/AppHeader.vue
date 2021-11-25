<template>
  <header class="header-global" style="position: relative">
    <base-nav class="navbar-main" transparent :type="navColorSetting" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-4" to="/">
        <img src="@/assets/img/white.png" alt="logo" style="height: 40px" />
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
            <img src="@/assets/img/blue.png" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>
      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text" icon="ni ni-bell-55">Guide</span>
          </a>
          <div class="dropdown-menu-inner">
            <router-link :to="{ name: 'Guide' }" class="media d-flex align-items-center">
              <!-- <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/" class="media d-flex align-items-center"> -->
              <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                <i class="ni ni-spaceship"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">Getting started</h6>
                <p class="description d-none d-md-inline-block mb-0">Get to know HappyHouse, a perfect tool to help find your perfect match.</p>
              </div>
            </router-link>
            <!-- </a> -->
            <!-- <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/" class="media d-flex align-items-center"> -->
            <router-link :to="{ name: 'AboutUs' }" class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                <i class="ni ni-single-02"></i>
              </div>
              <div class="media-body ml-3">
                <h5 class="heading text-warning mb-md-1">About Us</h5>
                <p class="description d-none d-md-inline-block mb-0">Learn about our team, and where to contact us</p>
              </div>
              <!-- </a> -->
            </router-link>
          </div>
        </base-dropdown>
      </ul>
      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <router-link :to="{ name: 'Board' }" class="nav-link">
          <b-icon icon="list" font-scale="1"></b-icon>
          <span class="nav-link-inner--text">Board</span>
        </router-link>
      </ul>
      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <router-link :to="{ name: 'Qna' }" class="nav-link">
          <b-icon icon="question" font-scale="1"></b-icon>
          <span class="nav-link-inner--text">QnA</span>
        </router-link>
      </ul>
      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <router-link :to="{ name: 'House' }" class="nav-link">
          <b-icon icon="house" font-scale="1"></b-icon>
          <span class="nav-link-inner--text">apt</span>
        </router-link>
      </ul>
      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <router-link :to="{ name: 'Test' }" class="nav-link">
          <b-icon icon="heart" font-scale="1"></b-icon>
          <span class="nav-link-inner--text">_</span>
        </router-link>
      </ul>

      <!-- 이 아랫줄이 왼쪽 정렬 -->
      <ul class="navbar-nav align-items-lg-center ml-lg-auto navbar-nav-hover">
        <router-link to="/user/mypage" class="nav-link" v-if="userInfo">
          <b-avatar
            class="align-self-center mr-1"
            size="2rem"
            variant="primary"
            v-text="userInfo ? userInfo.userid.charAt(0).toUpperCase() : ''"
          ></b-avatar>
          Hello, {{ userInfo.name }}!
        </router-link>
        <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button" v-else>
          <i class="ni ni-collection d-lg-none"></i>
          <span class="nav-link-inner--text">Already a member?</span>
        </a>
        <!-- <router-link to="/landing" class="dropdown-item">Landing</router-link>
          <router-link to="/profile" class="dropdown-item">Profile</router-link>
          <router-link to="/login" class="dropdown-item">Login</router-link>
          <router-link to="/register" class="dropdown-item">Register</router-link> -->
        <!-- </base-dropdown> -->
        <li class="nav-item d-none d-lg-block ml-lg-1">
          <base-button outline type="default" @click="onClickLogout" v-if="userInfo">
            <!-- @click="openLoginModal()"> -->
            <span class="btn-inner--icon">
              <i class="fa fa-sign-out mr-2"></i>
            </span>
            <span class="nav-link-inner--text">Logout</span>
          </base-button>
          <base-button class="btn btn-neutral btn-icon" @click="openLoginModal" v-else>
            <span class="btn-inner--icon">
              <i class="ni ni-circle-08 mr-2"></i>
            </span>

            <span class="nav-link-inner--text">sign in</span>
          </base-button>
          <login-modal> </login-modal>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import BaseNav from "@/components/ui/BaseNav";
import BaseDropdown from "@/components/ui/BaseDropdown";
import CloseButton from "@/components/ui/CloseButton";
import LoginModal from "@/components/user/LoginModal.vue";

//TODO import Modal from "@/components/ui/Modal.vue";

export default {
  data() {
    return {
      openLogin: false,
      modals: {
        loginModal: false,
      },
    };
  },
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    LoginModal,
    //TODO Modal,
  },
  updated() {
    console.log("updated! called");
    // this.SET_SHOW_LOGIN_MODAL(false);
  },
  computed: {
    ...mapState("memberStore", ["userInfo"]),
    ...mapState("rootStore", ["showLoginModal"]),

    navColorSetting: function () {
      // console.log(this.$route.path);
      let setting = "";
      if (this.$route.path === "/") return setting;
      else if (this.$route.path.includes("/write") || this.$route.path.includes("/update") || this.$route.path === "/user/mypage") return "";
      else return "primary";
      // return this.$route.path === "/" ? "" : "primary";
    },
  },
  methods: {
    ...mapMutations("rootStore", ["SET_TRIGGER_LOGIN_MODAL"]),
    ...mapActions("memberStore", ["updateUserInfo", "deleteUserAccount", "logout"]),

    openLoginModal() {
      //// disable anchor tag
      //// e.preventDefault();
      //TODO this.modals.loginModal = true;
      //// this.openLogin = true;
      this.SET_TRIGGER_LOGIN_MODAL();
    },
    onClickLogout() {
      this.logout();
    },
  },
};
</script>
<style></style>
