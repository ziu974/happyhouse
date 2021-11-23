<template>
  <div>
    <!-- <transition name="modal-fade"> -->
    <!-- <div class="modal" v-show="showLoginModal"> -->
    <modal :show.sync="modals.loginModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm">
      <!-- <div class="modal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm" type="small" v-click-outside="closeModal"> -->
      <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0">
        <template>
          <div class="text-muted text-center mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <base-button type="neutral">
              <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/github.svg" />
              Github
            </base-button>

            <base-button type="neutral">
              <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/google.svg" />
              Google
            </base-button>
          </div>
        </template>
        <template>
          <div class="text-center text-muted mb-4">
            <small>Or sign in with credentials</small>
          </div>
          <form role="form">
            <base-input alternative class="mb-3" placeholder="Email" addon-left-icon="ni ni-email-83"> </base-input>
            <base-input alternative type="password" placeholder="Password" addon-left-icon="ni ni-lock-circle-open"> </base-input>
            <base-checkbox> Remember me </base-checkbox>
            <div class="text-center">
              <base-button type="primary" class="my-4">Sign In</base-button>
            </div>
          </form>
        </template>
      </card>
    </modal>
  </div>
  <!-- </transition> -->
</template>

<script>
import { mapState } from "vuex";
import Modal from "@/components/ui/Modal.vue";

export default {
  name: "LoginModal",
  data() {
    return {
      momo: null,
      modals: {
        loginModal: false,
      },
    };
  },
  computed: {
    ...mapState("rootStore", ["showLoginModal"]),
  },
  watch: {
    showLoginModal: function () {
      this.modals.loginModal = true;
    },
  },
  components: {
    Modal,
  },
  methods: {},
};
</script>

<style>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
