import creatApp from './cteate-app'

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = creatApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        console.log('no components')
      }
      console.log(matchedComponents)
      resolve(app)
    })
  })
}