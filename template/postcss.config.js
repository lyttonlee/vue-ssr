const AutoPrefixer = require('autoprefixer')
// 这个主要是处理css语言的，某些css语言需要加前缀，webkit-XX,这个autoprefixer可以帮我们完成
module.exports = {
  plugins: [
    new AutoPrefixer()
  ]
}
