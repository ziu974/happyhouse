<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <!-- Using value -->
    <b-button v-b-modal="'signup-modal'">Show Modal</b-button>
    <b-modal id="signup-modal">
      <div class="vue-tempalte">
        <form>
          <h3>Sign Up</h3>
          <b-container class="mt-4">
            <b-row>
              <b-col cols="2" align-self="end">아이디</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <b-input v-model="userInfo.userid" placeholder="아이디"></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" align-self="end">이름</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <b-input v-model="userInfo.name" placeholder="이름"></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" align-self="end">이름</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <b-input v-model="userInfo.userpwd" placeholder="비밀번호"></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" align-self="end">이름</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <b-input v-model="userInfo.email" placeholder="이메일"></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" align-self="end">전화번호</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <b-input v-model="userInfo.tel" placeholder="전화번호"></b-input>
              </b-col>
            </b-row>
          </b-container>
          <button class="btn btn-dark btn-lg btn-block" @click="signUp">Sign Up</button>

          <!-- <div class="form-group">
            <label>Full Name</label>
            <input type="text" class="form-control form-control-lg" />
          </div>

          <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control form-control-lg" />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control form-control-lg" />
          </div>


          <p class="forgot-password text-right">
            Already registered?
            <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
          </p>-->
        </form>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberJoin",
  data() {
    return {
      isModify: true,
      userInfo: {
        userid: "",
        name: "",
        userpwd: "",
        email: "",
        tel: "",
      },
    };
  },
  methods: {
    ...mapActions(memberStore, ["createUserAccount"]),

    signUp() {
      console.log(this.userInfo);
      this.createUserAccount(this.userInfo);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
