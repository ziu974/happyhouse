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
    <div class="container pt-lg-md">
      <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
        <!-- <div class="wizard-header text-center">
          <h3 class="wizard-title">Create your profile</h3>
          <p class="category">Welcome to HappyHouse, 회원가입 please</p>
        </div> -->
        <form-wizard
          shape="circle"
          color="#5e72e4"
          title="Create your profile"
          subtitle="Welcome to HappyHouse, 회원가입 please"
          @on-complete="signUp"
        >
          <tab-content title="Type" icon="ni ni-email-83">
            <div id="first">
              <h5 class="info-text">What are you doing? (select 1)</h5>
              <b-row>
                <!-- <b-col> -->
                <!-- <div class="col-sm-8 col-sm-offset-2"> -->
                <!-- <div class="col-sm-4"> -->
                <b-col class="choice" data-toggle="wizard-checkbox">
                  <input type="checkbox" name="jobb" value="Design" />
                  <card shadow class="card-hover-effect" @mouseover="true">
                    <i class="ni ni-app"></i>
                    <p>Type 1</p>
                  </card>
                </b-col>
                <!-- </b-col> -->
                <!-- <div class="col-sm-4"> -->
                <b-col class="choice" data-toggle="wizard-checkbox">
                  <input type="checkbox" name="jobb" value="Code" />
                  <div class="card card-checkboxes card-hover-effect">
                    <i class="ni ni-badge"></i>
                    <p>Type 2</p>
                  </div>
                </b-col>
              </b-row>
            </div>
          </tab-content>
          <tab-content title="Account" icon="ni ni-email-83">
            <div id="second">
              <h5 class="info-text">What are you doing? (select 1)</h5>
              <b-row align-h="center">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>아이디 <small>(required)</small></label>
                    <base-input v-model="userInfo.userid" name="name" type="text" placeholder="Username" />
                  </div>
                  <div class="form-group">
                    <label>비밀번호<small>(required)</small></label>
                    <base-input v-model="userInfo.userpwd" name="pwd" type="password" placeholder="Password (4-16char)" />
                    <input name="pwdConfirm" type="password" class="form-control" placeholder="Password Confirm" />
                  </div>
                </div>
              </b-row>
            </div>
          </tab-content>
          <tab-content title="Personal Info" icon="ni ni-email-83">
            <div id="third">
              <b-row>
                <div class="picture-container">
                  <div class="picture">
                    <img src="assets/img/default-avatar.jpg" class="picture-src picture" id="wizardPicturePreview" title="" />
                    <input type="file" id="wizard-picture" />
                  </div>
                  <h6>Choose Picture</h6>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>이름 <small>(required)</small></label>
                    <input v-model="userInfo.name" name="name" type="text" class="form-control" placeholder="Name" />
                  </div>
                  <div class="form-group">
                    <label>전화번호<small>(required)</small></label>
                    <input v-model="userInfo.tel" name="tel" type="tel" class="form-control" placeholder="Tel" />
                  </div>
                </div>
                <div class="col-sm-12 col-sm-offset-1">
                  <div class="form-group">
                    <label>Email <small>(required)</small></label>
                    <input v-model="userInfo.email" name="email" type="email" class="form-control" placeholder="example@happyhouse.com" />
                  </div>
                </div>
              </b-row></div
          ></tab-content>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </form-wizard>
        <!-- <form-wizard @on-complete="onComplete" shape="circle" color="#e74c3c">
          <tab-content title="Personal details" route="/first" icon="ti-user"> </tab-content>
          <tab-content title="Additional Info" route="/second" icon="ti-settings"> </tab-content>
          <tab-content title="Last step" route="/third" icon="ti-check"> </tab-content>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </form-wizard> -->
      </card>
    </div>
  </section>
</template>

<script>
//local registration
import { mapActions } from "vuex";
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
// vuelidate
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
// import { validationMixin } from "vuelidate";
// import { required, minLength } from "vuelidate/lib/validators";

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
      form: {
        email: null,
        food: null,
      },
    };
  },
  //component code
  components: {
    FormWizard,
    TabContent,
  },
  methods: {
    ...mapActions("memberStore", ["createUserAccount"]),
    async signUp() {
      console.log(this.userInfo);
      await this.createUserAccount(this.userInfo);
      alert("셩공 >_<");
      this.$router.push({ name: "Login" });
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        name: null,
        food: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      console.log("지워");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      alert("Form submitted!");
    },
    onComplete: function () {
      alert("Yay. Done!");
    },
    isLastStep() {
      if (this.$refs.wizard) {
        return this.$refs.wizard.isLastStep;
      }
      return false;
    },
  },
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    form: {
      email: {
        email,
        required,
      },
      name: {
        required,
      },
    },
  },
};
</script>

<style>
.finish-button {
  background-color: #43a047 !important;
  border-color: #43a047 !important;
}

.font {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  margin: 0 0 10px;
  -webkit-font-smoothing: antialiased;
  font-family: "Muli", "Helvetica", Arial, sans-serif;
  line-height: 1.4em;
  font-size: 14px;
  font-weight: 400;
  color: #9a9a9a;
  margin-bottom: 0px;
  text-align: center;
}

.wizard-card .picture {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  line-height: 1.42857143;
  font-size: 14px;
  font-family: "Muli", Arial, sans-serif;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  width: 106px;
  height: 106px;
  background-color: #d8d1c9;
  border: 4px solid transparent;
  color: #ffffff;
  border-radius: 50%;
  margin: 5px auto;
  overflow: hidden;
  -webkit-transition: all 0.2s;
}

.card .card-checkboxes {
  background-color: #f3f2ee;
  box-shadow: none;
  color: rgba(0, 0, 0, 0.3);

  padding: 10px 0;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  text-align: center;
  cursor: pointer;
}

.card .card-hover-effect {
  -webkit-transition: transform 300ms cubic-bezier(0.34, 2, 0.6, 1), box-shadow 200ms ease;
  -moz-transition: transform 300ms cubic-bezier(0.34, 2, 0.6, 1), box-shadow 200ms ease;
  -o-transition: transform 300ms cubic-bezier(0.34, 2, 0.6, 1), box-shadow 200ms ease;
  -ms-transition: transform 300ms cubic-bezier(0.34, 2, 0.6, 1), box-shadow 200ms ease;
  transition: transform 300ms cubic-bezier(0.34, 2, 0.6, 1), box-shadow 200ms ease;
}
</style>
