var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'index': './www/src/bilifansapp.js',
        'browse': './www/src/browse.js',
        vendor: ['vue','element-ui','vue-data-tables']
    },
  output: {
    publicPath: '/assets/',
    path: path.resolve(__dirname, './www/assets'),
    filename: '[name]-bundle.js',
    chunkFilename: "[name].[chunkHash:8].js"
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
    // noInfo: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
  ],
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
  module.exports.output.filename = '[name]-bundle.[chunkhash:8].js?';
  module.exports.output.path = path.resolve(__dirname, './www/build');
}
