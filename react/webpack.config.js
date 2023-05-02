const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { SourceMapDevToolPlugin } = require('webpack');

const deps = require("./package.json").dependencies;

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        remote: "remote@http://localhost:8080/remoteEntry.js",
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@style': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
  },
  output: {
    // filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
  },
};
