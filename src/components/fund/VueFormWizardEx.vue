<template>
  <div id="app">
    <section class="section section-shaped section-lg my-0">
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

export default {
  name: "VueFormLALALAL",
  //component code
  components: {
    FormWizard,
    TabContent,
  },
  methods: {
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
};
</script>

<style>
.finish-button {
  background-color: #43a047 !important;
  border-color: #43a047 !important;
}
</style>
