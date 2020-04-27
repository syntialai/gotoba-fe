module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/index.scss";
          @import "@/assets/scss/pages/timeline.scss";
        `,
      },
    },
  },
};
