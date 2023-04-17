const {VueLoaderPlugin} = require("vue-loader");
const path = require("path"); //절대 경로 적을 때 도와주는 node 기능


module.exports = {
  mode: 'development',
  devtool: 'eval', //개발할 때는 보통 eval, 빌드 속도가 빠름
  resolve: { //확장자 처리해 줌 (.vue 이런 확장자를 제거하고 적을 수 있음)
    extensions: ['.js','.vue'],
  },
  entry: {
    app: './main.js', //스크립트를 합친 후, 대표 파일
  },
  module: {
    rules: [{
      test: /\.vue$/, //파일명이 .vue로 끝나는 파일
      loader: 'vue-loader', //웹팩은 원래 자바 스크립트만 합쳐주니까, vue-loader가 vue 파일을 처리해줌
    }]

  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  output: {
    filename: '[name].js', //app.js
    path: path.join(__dirname, 'dist'), //__dirname은 현재 경로

  },
};
