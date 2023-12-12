const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "public",
  lintOnSave: false,
  productionSourceMap: false,
  // assetsDir: 'static',
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("lin", resolve("src/lin"))
      .set("assets", resolve("src/asset"));
    config.module
      .rule("md")
      .test(/\.md$/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler");
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".json", ".vue", ".scss", ".html"],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/style/share.scss";',
      },
    },
  },
  devServer: {
    port: 9527,
    open: true,
    proxy: {
      "/api-recruit": {
        target: "http://121.40.51.93:18011", //线上环境
        ws: true,
        changeOrigin: true, // 跨域
        pathRewrite: {
          "^/api-recruit": "",
        },
      },
    },
  },
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: ["vuex-persist"],
};
