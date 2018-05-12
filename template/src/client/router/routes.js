const options = {
  mode: 'history',
  routes: [
    {
      path: '/',
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
    },
    {
      path: '*',
      component: () => import('@/client/views/404')
    }
  ]
}
export default options
