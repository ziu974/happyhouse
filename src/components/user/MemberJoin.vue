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
    <base-alert type="success" dismissible v-if="isFailError">
      <span class="alert-inner--icon"><i class="fa fa-exclamation-triangle"></i></span>
      <span class="alert-inner--text"><strong>SignUp Complete!</strong> Welcome to HappyHouse, {{ userInfo.name }}!</span>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </base-alert>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
            <template>
              <h1 class="display-3">Sign Up</h1>
              <div class="text-left text-muted mb-4">
                <small>Join HappyHouse!</small>
              </div>
            </template>
            <template>
              <form role="form">
                <base-input v-model="userInfo.userid" required class="mb-3" placeholder="ID" addon-left-icon="ni ni-single-02"> </base-input>
                <base-input v-model="userInfo.userpwd" required type="password" placeholder="Password" addon-left-icon="ni ni-lock-circle-open">
                </base-input>
                <base-input v-model="userInfo.name" required class="mb-3" placeholder="Name" addon-left-icon="ni ni-bold"> </base-input>
                <base-input v-model="userInfo.email" required type="email" class="mb-3" placeholder="Email" addon-left-icon="ni ni-email-83">
                </base-input>
                <base-input v-model="userInfo.tel" required type="tel" class="mb-3" placeholder="Telephone" addon-left-icon="fa fa-phone">
                </base-input>
                <div class="text-muted font-italic">
                  <!-- <small
                    >password strength:
                    <span class="text-success font-weight-700">strong</span>
                  </small> -->
                </div>
                <base-checkbox>
                  <span
                    >I agree with the
                    <a href="#">Privacy Policy</a>
                  </span>
                </base-checkbox>
                <div class="text-center">
                  <base-button type="primary" class="mb-1 mt-5" @click="signUp">Create account</base-button>
                </div>
              </form>
            </template>
            <!-- <hr /> -->
            <div class="text-center mt-4">
              <small>Already a member?</small>
            </div>
            <router-link :to="{ name: 'Login' }">
              <base-button block outline type="primary">log in</base-button>
            </router-link>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "MemberJoin",
  data() {
    return {
      isModify: true,
      isFailError: false,
      userInfo: {
        userid: "",
        name: "",
        userpwd: "",
        email: "",
        tel: "",
      },
    };
  },
  watch: {
    isSignUpError: function () {
      this.isFailError = this.isSignUpError;
    },
  },
  methods: {
    ...mapActions("memberStore", ["createUserAccount", "isSignUpError"]),
    async signUp() {
      console.log(this.userInfo);
      await this.createUserAccount(this.userInfo);
      this.$router.push({ name: "Login" });
    },
    // validateState(name) {
    //   const { $dirty, $error } = this.$v.form[name];
    //   return $dirty ? !$error : null;
    // },
    // resetForm() {
    //   this.form = {
    //     name: null,
    //     food: null,
    //   };

    //   this.$nextTick(() => {
    //     this.$v.$reset();
    //   });
    // },
    // onSubmit() {
    //   console.log("지워");
    //   this.$v.form.$touch();
    //   if (this.$v.form.$anyError) {
    //     return;
    //   }

    //   alert("Form submitted!");
    // },
    // onComplete: function () {
    //   alert("Yay. Done!");
    // },
    // isLastStep() {
    //   if (this.$refs.wizard) {
    //     return this.$refs.wizard.isLastStep;
    //   }
    //   return false;
    // },
  },
};
</script>
<style></style>
