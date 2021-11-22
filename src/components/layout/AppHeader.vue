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
            <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/" class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                <i class="ni ni-spaceship"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">Getting started</h6>
                <p class="description d-none d-md-inline-block mb-0">Get started with HappyHouse, a perfect tool to help find your perfect match.</p>
              </div>
            </a>
            <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/" class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                <i class="ni ni-single-02"></i>
              </div>
              <div class="media-body ml-3">
                <h5 class="heading text-warning mb-md-1">About Us</h5>
                <p class="description d-none d-md-inline-block mb-0">Learn about our team, and where to contact us</p>
              </div>
            </a>
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
          <span class="nav-link-inner--text">UI Testing</span>
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
                <p class="description d-none d-md-inline-block mb-0">Get started with Bootstrap, the world's most popular framework for building responsive sites.</p>
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
        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">Account</span>
            <span class="nav-link-inner--text">Already a member?</span>
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
          <base-button class="btn btn-neutral btn-icon mb-3" @click="openLoginModal">
            <!-- @click="openLoginModal()"> -->
            <span class="btn-inner--icon">
              <i class="ni ni-circle-08 mr-2"></i>
            </span>
            <span class="nav-link-inner--text">sign in</span>
          </base-button>
        </li>
      </ul>
    </base-nav>
    <!-- <login-modal :show.sync="openLogin" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm"> </login-modal> -->
  </header>
</template>
<script>
import BaseNav from "@/components/ui/BaseNav";
import BaseDropdown from "@/components/ui/BaseDropdown";
import CloseButton from "@/components/ui/CloseButton";
// import LoginModal from "@/components/user/LoginModal.vue";

export default {
  data() {
    return {
      openLogin: false,
    };
  },
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    // LoginModal,
  },
  computed: {
    navColorSetting: function () {
      // console.log(this.$route.path);
      return this.$route.path === "/" ? "" : "primary";
    },
  },
  methods: {
    openLoginModal(event) {
      // disable anchor tag
      event.preventDefault();
      this.openLogin = false;
    },
  },
};
</script>
<style></style>
