<template>
  <div style="margin-top: 140px">
    <b-container class="text-center">
      <h1 class="display-3" style="color: #525f7f; margin-bottom: 40px"><strong>Browse Deals</strong></h1>

      <b-row>
        <!-- <b-row class="container-item" style="padding-top: 20px; padding-bottom: 20px; background-color: #dee2e6"> -->
        <b-col>
          <house-search-bar></house-search-bar>
        </b-col>
        <b-col>
          <house-list />
        </b-col>
      </b-row>
      <hr />
      <b-row class="container-item">
        <b-col class="mt-5">
          <kakao-map></kakao-map>
        </b-col>
        <b-col>
          <tabs fill class="flex-column flex-md-row">
            <card shadow style="background-color: #e9ecef">
              <tab-pane>
                <span slot="title">
                  <i class="ni ni-cloud-upload-96" />
                  아파트 상세정보
                </span>
                <p class="description">
                  <house-detail />
                </p>
              </tab-pane>

              <tab-pane title="Profile">
                <span slot="title">
                  <i class="ni ni-bell-55 mr-2" />
                  주변 상권정보
                </span>
                <p class="description">
                  Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
                  american apparel, butcher voluptate nisi qui.
                </p>
              </tab-pane>

              <tab-pane>
                <span slot="title">
                  <i class="ni ni-calendar-grid-58" />
                  가격변동추이
                </span>
                <p class="description">
                  Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                  Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.
                </p>
              </tab-pane>
            </card>
          </tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseList from "@/components/house/HouseList.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";
import KakaoMap from "@/components/house/map/HouseMap.vue";
import TabPane from "@/components/ui/Tabs/TabPane.vue";
import Tabs from "@/components/ui/Tabs/Tabs.vue";

export default {
  name: "House",
  components: {
    HouseSearchBar,
    HouseList,
    HouseDetail,
    KakaoMap,
    TabPane,
    Tabs,
  },
};
</script>
<style scoped></style>
