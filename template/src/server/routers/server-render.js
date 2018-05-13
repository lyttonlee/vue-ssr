const ejs = require('ejs')
module.exports = async (ctx, renderer, template) => {
  // 指定返回文件是html
  ctx.headers['Content-Type'] = 'text/html'

  const context = {
    url: ctx.path
  }

  try {
    const appString = await renderer.renderToString(context)
    const metaInfo = context.meta.inject()
    // console.log(metaInfo)
    const {title} = metaInfo
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text()
    })

    ctx.body = html
  } catch (error) {
    console.log(error)
    throw error
  }
}