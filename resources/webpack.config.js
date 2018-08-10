var webpack = require('webpack');

module.exports = {
  entry: {
    index: './js/index.js',
    vendor: ['jquery', 'velocity-animate']
  },
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: '[name].bundle.js',
    // 出力先のパス
    path: __dirname + '/../js/'
  },
  module: {
    // rules: [
    //     {
    //         test: /\.js$/,
    //         exclude: /node_modules/,
    //         loader: 'eslint-loader',
    //     },
    // ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};


if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true
      }
    })
  ];
}
