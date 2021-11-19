<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>내정보</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>My Page</template>

          <template #lead> 내 정보 확인페이지입니다. </template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col>

              <b-col cols="4" align-self="start" v-if="isModify">
                <p style="color: magenta">{{ userInfo.userid }}</p>
              </b-col>
              <b-col cols="4" align-self="start" v-else>{{ userInfo.userid }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <b-input v-model="modifiedInfo.name" :placeholder="userInfo.name"></b-input>
              </b-col>
              <b-col cols="4" align-self="start" v-else>{{ userInfo.name }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">비밀번호</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <b-input v-model="modifiedInfo.userpwd" :placeholder="userInfo.userpwd" type="password"></b-input>
              </b-col>
              <b-col cols="4" align-self="start" v-else>{{ userInfo.userpwd }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <b-input v-model="modifiedInfo.email" :placeholder="userInfo.email"></b-input>
              </b-col>
              <b-col cols="4" align-self="start" v-else>{{ userInfo.email }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">전화번호</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <b-input v-model="modifiedInfo.tel" :placeholder="userInfo.tel"></b-input>
              </b-col>
              <b-col cols="4" align-self="start" v-else>{{ userInfo.tel }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">관심지역</b-col>
              <b-col cols="4" align-self="start" v-if="isModify">
                <p>"여기는이렇게하면안됨"</p>
              </b-col>
              <b-col cols="4" align-self="start" v-else>{{ userInfo.interest_code }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button v-if="isModify" variant="primary" href="#" class="mr-1" @click="sendModifyInfo">정보수정완료</b-button>
          <div v-else>
            <b-button variant="primary" href="#" class="mr-1" @click="modifyInfo">정보수정</b-button>
            <b-button variant="danger" href="#" @click="deleteUser">회원탈퇴</b-button>
          </div>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  data() {
    return {
      isModify: false,
      modifiedInfo: {
        name: String,
        userpwd: String,
        email: String,
        tel: String,
      },
    };
  },
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["updateUserInfo", "deleteUserAccount", "logout"]),
    modifyInfo() {
      this.modifiedInfo = {
        userid: this.userInfo.userid,
        name: this.userInfo.name,
        userpwd: this.userInfo.userpwd,
        email: this.userInfo.email,
        tel: this.userInfo.tel,
        // 관심지역은 그대로
        interest_code: this.userInfo.interest_code,
      };
      this.isModify = true;
    },
    sendModifyInfo() {
      this.updateUserInfo(this.modifiedInfo);
      this.isModify = false;
    },
    deleteUser() {
      if (confirm("정말 회원탈퇴를 하시겠습니까? 작성하신 모든 글은 삭제됩니다. (복구불가능)")) {
        this.deleteUserAccount(this.userInfo.userid);
        this.logout();
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style></style>
