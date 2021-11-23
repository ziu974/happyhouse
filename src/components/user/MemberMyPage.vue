<template>
  <div class="profile-page">
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
              <!-- <b-button variant="danger" href="#" @click="deleteUser">회원탈퇴</b-button> -->
              <!-- Modal (회원탈퇴) -->
              <base-button type="danger" @click="modals.deleteUserModal = true"> 회원탈퇴 </base-button>
              <modal :show.sync="modals.deleteUserModal" gradient="danger" modal-classes="modal-danger modal-dialog-centered">
                <h6 slot="header" class="modal-title" id="modal-title-notification">Your attention is required</h6>

                <div class="py-3 text-center">
                  <i class="fa fa-exclamation-triangle fa-5x"></i>
                  <h3 class="heading mt-4 mb-3">Warning!</h3>
                  <p>Deleting Accounts are not reversible and your data will be permanently destroyed. Would you still like to persue?</p>
                </div>

                <template slot="footer">
                  <base-button type="white" @click="deleteUser">Yes, Delete Anyway</base-button>
                  <base-button type="link" text-color="white" class="ml-auto" @click="modals.deleteUserModal = false"> Cancel </base-button>
                </template>
              </modal>
            </div>
          </b-jumbotron>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img v-lazy="'img/theme/team-4-800x800.jpg'" class="rounded-circle" />
                  </a>
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button type="info" size="sm" class="mr-4">Connect</base-button>
                  <base-button type="default" size="sm" class="float-right">Message</base-button>
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">22</span>
                    <span class="description">Friends</span>
                  </div>
                  <div>
                    <span class="heading">10</span>
                    <span class="description">Photos</span>
                  </div>
                  <div>
                    <span class="heading">89</span>
                    <span class="description">Comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                Jessica Jones
                <span class="font-weight-light">, 27</span>
              </h3>
              <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>Bucharest, Romania</div>
              <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer</div>
              <div><i class="ni education_hat mr-2"></i>University of Computer Science</div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <p>
                    An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
                    records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.
                  </p>
                  <a href="#">Show more</a>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "@/components/ui/Modal.vue";

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
      modals: {
        // modal1: false,
        deleteUserModal: false,
        // modal3: false
      },
    };
  },
  components: {
    Modal,
  },
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

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}
</style>
