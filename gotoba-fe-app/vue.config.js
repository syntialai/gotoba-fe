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
}
