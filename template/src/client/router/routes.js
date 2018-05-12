const options = {
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: () => import('@/client/views/home'),
      meta: {
        name: 'home'
      }
    },
    {
      path: '/vuex',
      component: () => import('@/client/views/vuex'),
      meta: {
        name: 'vuex'
      }
    }
  ]
}
export default options
