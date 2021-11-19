module.exports = {
  devServer: {
    proxy: {
      "/openapi.molit.go.kr/": {
        target: "http://openapi.molit.go.kr",
        pathRewrite: { "/openapi.molit.go.kr/": "" },
        changeOrigin: true,
        secure: false,
      },
      "/apis.data.go.kr/": {
        target: "http://apis.data.go.kr",
        pathRewrite: { "/apis.data.go.kr/": "" },
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
