import createApp from './cteate-app'

const {app, router} = createApp()

router.onReady(() => {
  app.$mount('#app')
})
