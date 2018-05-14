import creatApp from './cteate-app'

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router} = creatApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        console.log('no components matched!')
        return reject(new Error('no components catched'))
      }
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
