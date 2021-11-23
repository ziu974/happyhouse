<template>
  <header class="header-global" style="position: relative">
    <base-nav class="navbar-main" transparent :type="navColorSetting" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img src="img/brand/white.png" alt="logo" />
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
            <img src="img/brand/blue.png" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <!-- <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <router-link :to="{ name: 'Home' }" class="nav-link">
          <b-icon icon="house" font-scale="1"></b-icon>
          <span class="nav-link-inner--text">HOME</span>
        </router-link>
      </ul> -->
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

      <!-- <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text">Components</span>
          </a>
          <div class="dropdown-menu-inner">
            <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/" class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                <i class="ni ni-spaceship"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">Getting started</h6>
                <p class="description d-none d-md-inline-block mb-0">
                  Get started with Bootstrap, the world's most popular framework for building responsive sites.
                </p>
              </div>
            </a>
            <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/" class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                <i class="ni ni-ui-04"></i>
              </div>
              <div class="media-body ml-3">
                <h5 class="heading text-warning mb-md-1">Components</h5>
                <p class="description d-none d-md-inline-block mb-0">Learn how to use Argon compiling Scss, change brand colors and more.</p>
              </div>
            </a>
          </div>
        </base-dropdown>
        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">Examples</span>
          </a>
          <router-link to="/landing" class="dropdown-item">Landing</router-link>
          <router-link to="/profile" class="dropdown-item">Profile</router-link>
          <router-link to="/login" class="dropdown-item">Login</router-link>
          <router-link to="/register" class="dropdown-item">Register</router-link>
        </base-dropdown>
      </ul> -->
      <!-- <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <a class="nav-link nav-link-icon" href="https://www.facebook.com/creativetim" target="_blank" rel="noopener" data-toggle="tooltip" title="Like us on Facebook">
            <i class="fa fa-facebook-square"></i>
            <span class="nav-link-inner--text d-lg-none">Facebook</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-link-icon" href="https://www.instagram.com/creativetimofficial" target="_blank" rel="noopener" data-toggle="tooltip" title="Follow us on Instagram">
            <i class="fa fa-instagram"></i>
            <span class="nav-link-inner--text d-lg-none">Instagram</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-link-icon" href="https://twitter.com/creativetim" target="_blank" rel="noopener" data-toggle="tooltip" title="Follow us on Twitter">
            <i class="fa fa-twitter-square"></i>
            <span class="nav-link-inner--text d-lg-none">Twitter</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-link-icon" href="https://github.com/creativetimofficial/vue-argon-design-system" target="_blank" rel="noopener" data-toggle="tooltip" title="Star us on Github">
            <i class="fa fa-github"></i>
            <span class="nav-link-inner--text d-lg-none">Github</span>
          </a>
        </li> -->

      <!-- 이 아랫줄이 왼쪽 정렬 -->
      <ul class="navbar-nav align-items-lg-center ml-lg-auto navbar-nav-hover">
        <!-- <b-nav-item class="align-self-center"
          ><b-avatar variant="primary" v-text="userInfo ? userInfo.userid.charAt(0).toUpperCase() : ''"></b-avatar>{{ userInfo.username }}({{
            userInfo.userid
          }})님 환영합니다.</b-nav-item
        > -->
        <router-link to="/profile" class="nav-link" v-if="userInfo">
          <b-avatar
            class="align-self-center mr-1"
            size="2rem"
            variant="primary"
            v-text="userInfo ? userInfo.userid.charAt(0).toUpperCase() : ''"
          ></b-avatar>
          Hello, {{ userInfo.name }}!
        </router-link>
        <!-- <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
          <i class="ni ni-collection d-lg-none"></i>
          <span class="nav-link-inner--text"></span>
          <span class="nav-link-inner--text">Already a member?</span>
        </a> -->
        <base-dropdown tag="li" class="nav-item" v-else>
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>

            <span class="nav-link-inner--text" v-if="userInfo">Hello, {{ userInfo.name }}!</span>
            <span class="nav-link-inner--text" v-else>Already a member?</span>
          </a>
          <router-link to="/landing" class="dropdown-item">Landing</router-link>
          <router-link to="/profile" class="dropdown-item">Profile</router-link>
          <router-link to="/login" class="dropdown-item">Login</router-link>
          <router-link to="/register" class="dropdown-item">Register</router-link>
        </base-dropdown>
        <li class="nav-item d-none d-lg-block ml-lg-1">
          <!-- <a href="https://www.creative-tim.com/product/vue-argon-design-system" target="_blank" rel="noopener" class="btn btn-neutral btn-icon">
            <span class="btn-inner--icon">
              <i class="ni ni-circle-08 mr-2"></i>
            </span>
            <span class="nav-link-inner--text">sign in</span>
          </a> -->
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
          <!-- <modal :show.sync="modals.loginModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm">
            <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
              <template>
                <div class="text-muted text-center mb-3">
                  <small>Sign in with</small>
                </div>
                <div class="btn-wrapper text-center">
                  <base-button type="neutral">
                    <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/github.svg" />
                    Github
                  </base-button>

                  <base-button type="neutral">
                    <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/google.svg" />
                    Google
                  </base-button>
                </div>
              </template>
              <template>
                <div class="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
                </div>
                <form role="form">
                  <base-input alternative class="mb-3" placeholder="Email" addon-left-icon="ni ni-email-83"> </base-input>
                  <base-input alternative type="password" placeholder="Password" addon-left-icon="ni ni-lock-circle-open"> </base-input>
                  <base-checkbox> Remember me </base-checkbox>
                  <div class="text-center">
                    <base-button type="primary" class="my-4">Sign In</base-button>
                  </div>
                </form>
              </template>
            </card>
          </modal>-->
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
      return this.$route.path === "/" ? "" : "primary";
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
