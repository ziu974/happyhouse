<template>
  <b-container class="bv-example-row mt-3">
    <!-- Using value -->
    <b-button v-b-modal="'signup-modal'">Show Modal(로그인창열기)</b-button>
    <b-modal id="signup-modal">
      <b-row>
        <b-col>
          <b-alert variant="secondary" show><h3>로그인</h3></b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
            <b-form @reset="onReset" class="text-left">
              <b-alert show variant="danger" v-if="isLoginError">아이디 또는 비밀번호를 확인하세요.</b-alert>
              <b-form-group label="아이디:" label-for="userid">
                <b-form-input id="userid" v-model="user.userid" required placeholder="아이디 입력...." @keyup.enter="confirm" ref="userid"></b-form-input>
              </b-form-group>
              <b-form-group label="비밀번호:" label-for="userpwd">
                <b-form-input type="password" id="userpwd" v-model="user.userpwd" required placeholder="비밀번호 입력...." @keyup.enter="confirm" ref="userpwd"></b-form-input>
              </b-form-group>
              <b-button type="button" variant="primary" class="m-1" @click="onSubmit">로그인</b-button>
              <b-button type="button" variant="success" class="m-1" @click="movePage">회원가입</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>

      <!-- <div class="vue-tempalte">
        <form>
          <h3>Sign In</h3>

          <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control form-control-lg" />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control form-control-lg" />
          </div>

          <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>

          <p class="forgot-password text-right mt-2 mb-4">
            <router-link to="/forgot-password">Forgot password ?</router-link>
          </p>
        </form>
      </div> -->
    </b-modal>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
// import { mapActions } from "vuex";
// export default {
//   name: "SignIn",
//   data() {
//     return {
//       isLoginError: false,
//       user: {
//         userid: "",
//         userpwd: "",
//       },
//     };
//   },
//   methods: {
//     ...mapActions(["postLogin"]),
//     onSubmit(event) {
//       event.preventDefault();

//       let err = true;
//       let msg = "";
//       !this.user.userid && ((msg = "아이디를 입력해주세요"), (err = false), this.$refs.userid.focus());
//       err && !this.user.userpwd && ((msg = "비밀번호를 입력해주세요"), (err = false), this.$refs.userpwd.focus());

//       console.log("sklfj");
//       if (!err) alert(msg);
//       else this.requestLogin();
//     },
//     onReset(event) {
//       event.preventDefault();
//       this.user.userid = "";
//       this.user.subject = "";
//       this.$router.push({ name: "Home" });
//     },
//     requestLogin() {
//       this.postLogin(this.user);
//     },
//     confirm() {
//       alert("로그인!!!");
//     },
//     movePage() {
//       this.$router.push({ name: "MemberJoin" });
//     },
//   },
// };
</script>

<style></style>
