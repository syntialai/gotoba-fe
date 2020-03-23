module.exports = {
  test: /\.scss$/,
  use: [
    'vue-style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        data: `
          @import "@/assets/scss/index.scss";
        `
      },
    },
  ],
}
