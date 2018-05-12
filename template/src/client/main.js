import Vue from 'vue'
import VueRouter from 'vue-router'
import meta from 'vue-meta'
import App from './app.vue'
import createRouter from './router'
Vue.use(VueRouter)
Vue.use(meta)
const router = createRouter()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
