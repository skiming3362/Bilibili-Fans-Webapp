var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'index': './www/static/js/src/bilifansapp.js',
        'browse': './www/static/js/src/browse.js'
    },
  output: {
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    proxy: {
      "/": {
        target: "http://localhost:9000",
        pathRewrite: {"^/" : ""}
      }
    }
    // noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
  var timestamp = Date.parse(new Date());
  timestamp = timestamp/1000;
  module.exports.output.filename = `[name]-bundle.js?${timestamp}`;
}
