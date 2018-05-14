const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const serverConfig = require('../../../build/webpack.server.conf')
const serverRender = require('./server-render')
// 创建服务端的webpack编译器
const serverCompiler = webpack(serverConfig)
// 指定将编译出来的文件写入内存方便快速读取
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

let bundle
// 监听编译
serverCompiler.watch({}, (err, stats) => {
  // 输出编译过程中的错误警告
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(err))
  // 获取编译出来的bundle路径
  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  // 解析获取bundle
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle 编译成功!')
})
// 服务端渲染
const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = 'no bundle'
    return
  }
  // 获取客户端数据,通过vue-server-renderer/client-plugin 生成
  // console.log('start req 8080')
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8080/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data
  // console.log('clientManifest', clientManifest)
  const template = fs.readFileSync(
    path.join(__dirname, '../template.ejs'),
    'utf-8'
  )
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}
const router = new Router()
router.get('*', handleSSR)

module.exports = router
