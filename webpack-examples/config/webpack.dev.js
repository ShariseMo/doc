const path = require('path')
module.exports = {
  // 入口文件：一个或多个【多个用数组表示】
  entry: {
    main: './src/main.js'
  },
  // 出口文件：有且只能有一个
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // 打包方式：development 、 production
  mode: 'development',

  module: {
    rules: [
      // css loader
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      // img loader
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      },
      // html loader
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            name: '[name].html'
          }
        }, ]
      }
    ]
  },

  devServer: {
    contentBase: 'dist',
    overlay: true
  }


}