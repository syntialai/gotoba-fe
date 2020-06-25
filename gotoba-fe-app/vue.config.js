module.exports = {
  assetsDir: 'static',
  // devServer: {
  //   proxy: {
  //     '^/': {
  //       target: 'http://localhost:8800',
  //       changeOrigin: true,
  //     },
  //   },
  // },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/index.scss";
        `,
      },
    },
  },
};
