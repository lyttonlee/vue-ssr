const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const app = new Koa()
const isDev = process.env.NODE_ENV === 'development'
const staticRouter = require('./routers/static')

app.use(async (ctx, next) => {
  try {
    console.log(`req path: ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'sorry! has err'
    }
  }
})
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}
app.use(async (ctx, next) => {
  if(ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../../')})
  } else {
    await next()
  }
})
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const Host = '0.0.0.0'
const Port = '8181'

app.listen(Port, Host, () => {
  console.log(`the server are listening on ${Host}:${Port}`)
})