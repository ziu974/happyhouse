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

          <div class="form-group">
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

          <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>

          <p class="forgot-password text-right">
            Already registered
            <router-link :to="{ name: 'login' }">sign in?</router-link>
          </p>
        </form>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: "MemberJoin",
};
</script>

<style></style>
