const path = require('path');
const os = require('os');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const sourceDir = path.join(__dirname, 'src/');
const jsDir = sourceDir + 'js';

const threadLoader = {
  loader: 'thread-loader',
  options: {
    workers: Math.max(1, ~~(os.cpus().length / 2)),
  },
};

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    babelrc: false,
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-nullish-coalescing-operator'],
      ['@babel/plugin-proposal-optional-chaining'],
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: 2,
          targets: { browsers: 'last 2 versions' },
          useBuiltIns: 'usage',
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
  },
};

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
  },
  entry: jsDir,
  resolve: {
    extensions: ['.tsx', '.js'],
    modules: [jsDir, 'node_modules'],
    alias: {
      styles: sourceDir + 'styles',
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [threadLoader, babelLoader],
      },
      {
        test: /\.tsx?$/,
        use: [threadLoader, babelLoader],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
