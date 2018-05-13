const Koa = require('koa')

const app = new Koa()
const pageRouter = require('./routers/dev-ssr')
const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`req with path ${ctx.path}`)
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

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const Host = '0.0.0.0'
const Port = '8181'

app.listen(Port, Host, () => {
  console.log(`the server are listening on ${Host}:${Port}`)
})