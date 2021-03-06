var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './app/index.js',

  output: {

    path: path.resolve(__dirname, 'build'),

    filename: 'index_bundle.js'


  },

  module: {

    rules: [

      {
        test: /\.(js)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]

  },

  mode: 'development',

  plugins: [

    new HtmlWebpackPlugin({

      template: 'app/index.html'

    })

  ]




}
