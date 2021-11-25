<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0" v-if="userInfo">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 class="display-2 text-center" style="color: white; width: 100%; padding: 150px">My Account</h1>
    </section>
    <section class="section section-skew">
      <div class="container" style="margin-top: -300px">
        <card shadow class="card-profile" no-body>
          <!-- <div class="px-4 mb-5"> -->
          <div class="px-4 mb-0">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img v-lazy="`../img/default-avatar.jpg`" class="rounded-circle" />
                  </a>
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-4 mt-lg-0">
                  <div v-if="isModify">
                    <base-button size="sm" type="warning" href="#" class="mr-2" @click="sendModifyInfo">정보수정완료</base-button>
                    <base-button outline size="sm" type="default" href="#" @click="isModify = false">취소</base-button>
                  </div>
                  <div v-else>
                    <base-button type="primary" size="sm" class="mr-2" @click="modifyInfo">정보수정</base-button>
                    <!-- <b-button variant="primary" href="#" class="mr-1" >정보수정</b-button> -->
                    <!-- <b-button variant="danger" href="#" @click="deleteUser">회원탈퇴</b-button> -->
                    <!-- Modal (회원탈퇴) -->
                    <base-button outline type="default" size="sm" class="float-right" @click="modals.deleteUserModal = true">회원탈퇴</base-button>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <!-- <span class="heading">{{ userInfo }}</span> -->
                  <div v-if="userInfo.joindate">
                    <span class="heading">{{ userInfo.joindate.slice(0, 10).replaceAll("-", "/") }}</span>
                    <span class="description">Member Since</span>
                  </div>
                  <div>
                    <span class="heading">89</span>
                    <span class="description">Comments</span>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5 kr-font-regular">
              <h3>
                {{ userInfo.name }}
                <span class="font-weight-light">, 27</span>
              </h3>

              <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>ID: {{ userInfo.userid }}</div>
              <div v-if="isModify" class="kr-font-regular mt-5" style="padding-left: 250px; padding-right: 250px">
                <base-input v-model="modifiedInfo.email" :placeholder="userInfo.email" addon-left-icon="ni ni-email-83"></base-input>
                <base-input v-model="modifiedInfo.tel" :placeholder="userInfo.tel" addon-left-icon="fa fa-phone"></base-input>
                <base-input
                  v-model="modifiedInfo.userpwd"
                  :placeholder="userInfo.userpwd"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                ></base-input>
              </div>
              <div v-else>
                <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>Email: {{ userInfo.email }}</div>
                <i class="ni education_hat mr-2"> </i>Tel: {{ userInfo.tel }}
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <!-- <p>
                    An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
                    records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.
                  </p> -->
                  <a href="#">Show more</a>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
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
  watch: {
    userInfo: function () {
      if (!this.userInfo) this.$router.push({ name: "Home" });
    },
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
        // 관심지역, 가입일은 그대로
        joindate: this.userInfo.joindate,
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
