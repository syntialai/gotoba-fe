module.exports = {
  runtimeCompiler: true,
  assetsDir: 'static',
  devServer: {
    proxy: {
      '^/api/': {
        target: 'http://localhost:8800/',
        changeOrigin: true,
      },
    },
  },
};
