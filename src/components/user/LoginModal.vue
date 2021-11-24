<template>
  <div>
    <!-- <transition name="modal-fade"> -->
    <!-- <div class="modal" v-show="showLoginModal"> -->
    <modal :show.sync="modals.loginModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm">
      <!-- <div class="modal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm" type="small" v-click-outside="closeModal"> -->
      <base-alert type="warning" v-if="isInputError">
        <span class="alert-inner--icon"><i class="fa fa-exclamation-triangle"></i></span>
        <span class="alert-inner--text"><strong>Missing Info!</strong> {{ alertMsg }}</span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="isInputError = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </base-alert>
      <base-alert type="danger" v-if="isFailError">
        <span class="alert-inner--icon"><i class="fa fa-exclamation-triangle"></i></span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="isFailError = false">&times;</button>
        <span class="alert-inner--text"><strong>Login Fail!</strong> Check your username and password.</span>
      </base-alert>
      <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
        <template>
          <h1 class="display-3">Login</h1>
          <!-- <div class="text-muted text-center mb-3">
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
          </div>-->
        </template>
        <template>
          <div class="text-left text-muted mb-4">
            <small>Sign in to HappyHouse</small>
          </div>
          <form role="form" @reset="onReset">
            <base-input
              v-model="user.userid"
              alternative
              class="mb-3"
              placeholder="Username"
              addon-left-icon="ni ni-single-02"
              @keyup.enter="confirm"
              refs="userid"
            >
            </base-input>
            <base-input
              id="userpwd"
              v-model="user.userpwd"
              alternative
              type="password"
              required
              placeholder="Password"
              addon-left-icon="ni ni-lock-circle-open"
              @keyup.enter="confirm"
              refs="userpwd"
            >
            </base-input>

            <b-row>
              <b-col>
                <p
                  class="mt-0"
                  @click="
                    modals.loginModal = false;
                    modals.findPasswordModal = true;
                  "
                >
                  <small><u>Forgot Password?</u></small>
                </p>
              </b-col>
              <b-col>
                <div class="text-center">
                  <base-button type="primary" @click="onSubmit">Sign In</base-button>
                </div>
              </b-col>
            </b-row>
            <hr />
            <div class="text-center">
              <small>OR</small>
            </div>
            <base-button block outline type="primary" @click="goSignUp">Create account</base-button>
          </form>
        </template>
      </card>
    </modal>
    <!-- ! 비밀번호 찾기 -->
    <modal :show.sync="modals.findPasswordModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm">
      <base-alert type="warning" v-if="isInputError">
        <span class="alert-inner--icon"><i class="fa fa-exclamation-triangle"></i></span>
        <span class="alert-inner--text"><strong>Missing Info!</strong></span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="isInputError = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </base-alert>
      <base-alert type="success" v-if="mailSent">
        <span class="alert-inner--icon"><i class="fa fa-exclamation-triangle"></i></span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="mailSent = false">&times;</button>
        <span class="alert-inner--text"><strong>Email Sent!</strong> Password has been sent to your email.</span>
      </base-alert>
      <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
        <template>
          <h1 class="display-3">Find Password</h1>
        </template>
        <template>
          <div class="text-left text-muted mb-4">
            <small>Forgot what your password was?</small>
          </div>
          <form role="form" @reset="onReset">
            <b-form-text id="input-live-help">Your ID</b-form-text>
            <base-input v-model="findpw.userid" alternative class="mb-3" placeholder="Username" addon-left-icon="ni ni-single-02"> </base-input>
            <b-form-text id="input-live-help">Your email</b-form-text>
            <base-input v-model="findpw.email" alternative type="email" required placeholder="Email" addon-left-icon="ni ni-email-83"> </base-input>

            <b-row>
              <b-col> </b-col>
              <b-col>
                <div class="text-center">
                  <!-- <base-button type="primary" @click="onSubmit"> -->
                  <a
                    href="`mailto:${findpw.email}?
                  subject=HappyHouse 비밀번호 찾기?
                  body=${foundPassword}`"
                    @click="requestFindPw"
                  >
                    submit
                  </a>
                  <!-- </base-button> -->
                </div>
              </b-col>
            </b-row>
            <hr />
            <div class="text-center">
              <small>OR</small>
            </div>
            <base-button
              block
              outline
              type="primary"
              @click="
                modals.loginModal = true;
                modals.findPasswordModal = false;
              "
              >log in</base-button
            >
          </form>
        </template>
      </card>
    </modal>
  </div>
  <!-- </transition> -->
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import BaseInput from "@/components/ui/BaseInput";
import Modal from "@/components/ui/Modal.vue";

export default {
  name: "LoginModal",
  data() {
    return {
      modals: {
        loginModal: false,
        findPasswordModal: false,
      },
      user: {
        userid: null,
        userpwd: null,
      },
      findpw: {
        userid: null,
        email: null,
      },
      alertMsg: "",
      isInputError: false,
      isFailError: false,
      mailSent: false,
    };
  },
  computed: {
    ...mapState("memberStore", ["isLogin", "isLoginError", "foundPassword"]),
    ...mapState("rootStore", ["showLoginModal"]),
  },
  watch: {
    showLoginModal: function () {
      this.modals.loginModal = true;
    },
    isLoginError: function () {
      this.isFailError = this.isLoginError;
    },
  },
  components: {
    Modal,
    BaseInput,
  },
  methods: {
    ...mapMutations("memberStore", ["SET_IS_LOGIN_ERROR"]),
    ...mapActions("memberStore", ["userConfirm", "getUserInfo", "findPassword"]),
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      !this.user.userid && ((this.alertMsg = "아이디를 입력해주세요"), (err = false));
      err && !this.user.userpwd && ((this.alertMsg = "비밀번호를 입력해주세요"), (err = false));

      if (!err) this.isInputError = true;
      // alert(this.alertMsg);
      else this.confirm();
    },
    onReset(event) {
      event.preventDefault();
      this.user.userid = "";
      this.user.subject = "";
      this.$router.push({ name: "Home" });
    },
    async confirm() {
      await this.userConfirm(this.user);
      //* SessionStorage에 token을 저장한 것을 가져옴
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.modals.loginModal = false;
        // this.$router.push({ name: "Home" });
      }
    },
    async requestFindPw() {
      await this.findPassword(this.findPw);
      if (this.foundPassword) {
        this.mailSent = true;
      }
    },
    goSignUp() {
      this.modals.loginModal = false;
      this.$router.push({ name: "SignUp" });
    },
    clearIsInputError() {
      this.isInputError = !this.isInputError;
    },
  },
  created() {
    this.SET_IS_LOGIN_ERROR(false);
  },
};
</script>

<style>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
