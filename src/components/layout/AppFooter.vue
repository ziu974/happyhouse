<template>
  <footer class="footer has-cards" :class="{ bgcol: navColorSetting }">
    <!-- <div class="container container-lg"></div> -->
    <div class="container my-md">
      <hr />
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ year }} <a href="https://www.creative-tim.com" target="_blank" rel="noopener">SSAFY 6th</a> :
            <a href="https://www.binarcode.com" target="_blank" rel="noopener"> Shin</a>
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a href="https://www.creative-tim.com" class="nav-link" target="_blank" rel="noopener">Creative Tim</a>
            </li>
            <li class="nav-item">
              <a href="https://www.creative-tim.com/presentation" class="nav-link" target="_blank" rel="noopener">About Us</a>
            </li>
            <li class="nav-item">
              <a href="http://blog.creative-tim.com" class="nav-link" target="_blank" rel="noopener">Blog</a>
            </li>
            <li class="nav-item">
              <a
                href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
                class="nav-link"
                target="_blank"
                rel="noopener"
                >MIT License</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
  computed: {
    navColorSetting: function () {
      console.log(this.$route.path);
      // let setting = "";
      // if (this.$route.path === "/") return setting;
      // else if (this.$route.path.includes("/qna/write") || this.$route.path.includes("/qna/update") || this.$route.path === "/profile") return "";
      // else return "primary";

      if (this.$route.path === "/") return false;
      else if (this.$route.path.includes("/write") || this.$route.path.includes("/update") || this.$route.path === "/mypage") return true;
      else return false;
    },
  },
};
</script>
<style>
.footer.bgcol.has-cards {
  background: rgb(140, 157, 212);
}

.footer.has-cards {
  /* background: transparent; */
  bottom: 0;
  height: 270px;
  margin-top: 70px;
  /* position: fixed; */
  width: 100%;
}
</style>
