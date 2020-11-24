const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const path = require("path");

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    open: true,
    hot: true,
    port: 5000,
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: {
      //browserHistory的时候，刷新会报404. 自动重定向到index.html
      index: "./index.html",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true, //是否只转译
          //设置自定义转换器,TypeScript 可以将 TS 源码编译成 JS 代码，自定义转换器插件则可以让你定制生成的代码。比如删掉代码里的注释、改变变量的名字、将类转换为函数等等
          //TypeScript 将 TS 代码编译到 JS 的功能，其实也是通过内置的转换器实现的，从 TS 2.3 开始，TS 将此功能开放，允许开发者编写自定义的转换器。
          getCustomTransformers: () => ({
            //ts-import-plugin是为了按需引入antd
            before: [
              tsImportPluginFactory({
                libraryName: "antd",
                libraryDirectory: "es",
                style: "css",
              }),
            ],
          }), //设置编译选项
          compilerOptions: {
            module: "es2015", //模块规范是es2015
          },
        },
      },
      {
        test: /\.css$/, //css处理顺口
        use: [
          "style-loader",
          {
            //style-loader是把CSS当作一个style标签插入到HTML中
            loader: "css-loader", //css-loader是处理CSS中的import 和url
            options: { importLoaders: 0 },
          },
          {
            loader: "postcss-loader", //postcss是用来给CSS中根据can i use 网站的数据添加厂商前缀的
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          //   {
          //     loader: "px2rem-loader", //把px自动转成rem
          //     options: {
          //       remUnit: 75, //一个rem代表75px
          //       remPrecesion: 8, //计算精度保留8位小数
          //     },
          //   },
        ],
      },
      {
        test: /\.less$/, //处理less
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 0 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          //   {
          //     loader: "px2rem-loader",
          //     options: {
          //       remUnit: 75,
          //       remPrecesion: 8,
          //     },
          //   },
          "less-loader",
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/, //处理图片,把图片打包到输出目录中
        use: ["url-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", //以此文件作为模板拼入打包后的文件并输出到目标目录中
    }),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ],
};
