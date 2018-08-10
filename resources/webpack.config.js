const webpack = require('webpack');
const path = require('path');

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
    path: path.join(__dirname, '/../js/')
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  module: {
    rules: [
      {
        // ローダーの処理対象ファイル
        test: /\.js$/,
        // ローダーの処理対象から外すディレクトリ
        exclude: /node_modules/,
        use: [
          {
            // 利用するローダー
            loader: 'babel-loader',
            // ローダーのオプション
            options: {
              presets: [['env', { modules: false }]]
            }
          }
        ]
      }
    ]
  }
};
