const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const VueServerRenderer = require('vue-server-renderer')

const serverRenderer = require('./server-render')

const clientManifest = require('../../../dist/vue-ssr-client-manifest.json')
const renderer = VueServerRenderer.createBundleRenderer(
  path.join(__dirname, '../../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)
const template = fs.readFileSync(path.join(__dirname, '../template.ejs'), 'utf-8')

const PageRouter = new Router()

PageRouter.get('/*', async ctx => {
  await serverRenderer(ctx, renderer, template)
})

module.exports = PageRouter
