<template>
  <div class="profile-page">
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
    <section class="mt--600">
      <tabs fill class="flex-column flex-md-row">
        <card shadow>
          <tab-pane>
            <span slot="title">
              <i class="ni ni-cloud-upload-96" />
              Home
            </span>
            <p class="description">
              Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
              cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.
            </p>
          </tab-pane>

          <tab-pane title="Profile">
            <span slot="title">
              <i class="ni ni-bell-55 mr-2" />
              Profile
            </span>
            <p class="description">
              Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
              american apparel, butcher voluptate nisi qui.
            </p>
          </tab-pane>

          <tab-pane>
            <span slot="title">
              <i class="ni ni-calendar-grid-58" />
              Messages
            </span>
            <p class="description">
              Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
              cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.
            </p>
          </tab-pane>
        </card>
      </tabs>
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
    <div class="row">
      <div class="col-md-6 mb-5 mb-md-0">
        <div class="card card-lift--hover shadow border-0">
          <router-link to="/landing" title="Landing Page">
            <img v-lazy="'img/theme/landing.jpg'" class="card-img" />
          </router-link>
        </div>
      </div>
      <div class="col-md-6 mb-5 mb-lg-0">
        <div class="card card-lift--hover shadow border-0">
          <router-link to="/profile" title="Profile Page">
            <img v-lazy="'img/theme/profile.jpg'" class="card-img" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-lg-6 text-lg-center btn-wrapper">
      <a
        target="_blank"
        rel="noopener"
        href="https://twitter.com/creativetim"
        class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg"
        data-toggle="tooltip"
        data-original-title="Follow us"
      >
        <i class="fa fa-twitter"></i>
      </a>
      <a
        target="_blank"
        rel="noopener"
        href="https://www.facebook.com/creativetim"
        class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg"
        data-toggle="tooltip"
        data-original-title="Like us"
      >
        <i class="fa fa-facebook-square"></i>
      </a>
      <a
        target="_blank"
        rel="noopener"
        href="https://dribbble.com/creativetim"
        class="btn btn-neutral btn-icon-only btn-dribbble btn-lg btn-round"
        data-toggle="tooltip"
        data-original-title="Follow us"
      >
        <i class="fa fa-dribbble"></i>
      </a>
      <a
        target="_blank"
        rel="noopener"
        href="https://github.com/creativetimofficial"
        class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg"
        data-toggle="tooltip"
        data-original-title="Star on Github"
      >
        <i class="fa fa-github"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
