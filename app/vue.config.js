module.exports = {
  assetsDir: 'static',
  devServer: {
    proxy: {
      '^/api/': {
        target: 'http://localhost:8025/',
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/, 
        use: [
          'style-loader',
          'css-loader', 
          'sass-loader'
        ],
      },
    ],
  },
}
