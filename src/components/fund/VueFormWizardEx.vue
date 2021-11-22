<template>
  <div id="app">
    <section class="section section-shaped section-lg my-0">
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group id="example-input-group-1" label="Name" label-for="example-input-1">
          <b-form-input id="example-input-1" name="example-input-1" v-model="$v.form.name.$model" :state="validateState('name')" aria-describedby="input-1-live-feedback"></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback">This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
        </b-form-group>
      </b-form>
      <div class="shape shape-style-1 bg-gradient-default">
        <div class="container pt-lg-md">
          <div class="row justify-content-center">
            <form-wizard @on-complete="onComplete" ref="wizard" color="#e67e22">
              <tab-content title="Personal details" icon="ni ni-bell-55"> My first tab content </tab-content>
              <tab-content title="Additional Info" icon="ni ni-bell-55"> My second tab content </tab-content>
              <tab-content title="Last step" icon="ti-check"> Yuhuuu! This seems pretty damn simple </tab-content>
              <template slot="footer" slot-scope="props">
                <div class="wizard-footer-left">
                  <wizard-button v-if="props.activeTabIndex > 0 && !props.isLastStep" :style="props.fillButtonStyle">Previous</wizard-button>
                </div>
                <div class="wizard-footer-right">
                  <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Next</wizard-button>

                  <wizard-button v-else @click.native="alert('Done')" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">{{ props.isLastStep ? "Done" : "Next" }}</wizard-button>
                </div>
              </template>
            </form-wizard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
//local registration
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
// vuelidate
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
// import { validationMixin } from "vuelidate";
// import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "VueFormLALALAL",
  data() {
    return {
      foods: [
        { value: null, text: "Choose..." },
        { value: "apple", text: "Apple" },
        { value: "orange", text: "Orange" },
      ],
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
</style>
