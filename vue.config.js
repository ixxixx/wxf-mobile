module.exports = {
  // plugins: {
  //   autoprefixer: {},
  //   'postcss-px2rem-exclude': {
  //     remUnit: 16,
  //     exclude: /node_modules|foldoer_name/i
  //   }
  // }
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem-exclude')({
            remUnit: 16
            // exclude: /node_modules|foldoer_name/i
          })

        ]

      }

    }

  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  },
  publicPath: './',
  indexPath: 'index.html'

}
