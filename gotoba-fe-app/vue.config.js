module.exports = {
  runtimeCompiler: true,
  assetsDir: 'static',
  devServer: {
    proxy: 'http://localhost:8800/',
  },
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
