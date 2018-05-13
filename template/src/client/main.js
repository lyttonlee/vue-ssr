import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import meta from 'vue-meta'
import App from './app.vue'
import createRouter from './router'
import createStore from './store'
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(meta)
const router = createRouter()
const store = createStore()
// store 热重载
if (module.hot) {
  module.hot.accept([
    './store/actions',
    './store/getters',
    './store/mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./store/getters').default,
      mutations: require('./store/mutations').default,
      actions: require('./store/actions').default
    })
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
