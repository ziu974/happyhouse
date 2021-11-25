<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <base-alert type="danger" dismissible v-if="isLoginError">
      <span class="alert-inner--icon"><i class="fa fa-exclamation-triangle"></i></span>
      <span class="alert-inner--text"><strong>Login Fail!</strong> Check your username and password.</span>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </base-alert>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
            <!-- <template>
                            <div class="text-muted text-center mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/github.svg">
                                    Github
                                </base-button>

                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div>
                        </template> -->
            <template>
              <h1 class="display-3">Login</h1>
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
                <b-col>
                  <!-- <p class="mt-0" @click="modals.findPasswordModal = true"> -->
                  <small><u>Forgot Password?</u></small>
                  <!-- </p> -->
                </b-col>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="onSubmit">Sign In</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6"></div>
            <div class="col-6 text-right">
              <a href="#" class="text-light" @click="movePage">
                <small>Create new account</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
// import "../assets/vendor/nucleo/css/nucleo.css";
import "@/assets/vendor/font-awesome/css/font-awesome.css";
// import "../assets/scss/argon.scss";

// 여기에서 *Store.js에서 설정한 namespace의 이름으로 가져오면 됨
const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    // ! store를 여러개로 분리를 했기 때문에, 이 []안에 있는 state들은 첫번쨰 param의 것임을 명시해주기만 하면 됨 ㅎㅎ
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.user.userid && ((msg = "아이디를 입력해주세요"), (err = false), this.$refs.userid.focus());
      err && !this.user.userpwd && ((msg = "비밀번호를 입력해주세요"), (err = false), this.$refs.userpwd.focus());

      console.log("로그인 요청 전송...");
      if (!err) alert(msg);
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
        this.$router.push({ name: "Home" });
      }
    },
    movePage() {
      this.$router.push({ name: "SignUp" });
    },
  },
};
</script>
<style></style>
