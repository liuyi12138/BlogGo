import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'page',
      component: require('@/components/Page').default,
      children: [
        {
          path: '/blog-page',
          name: 'blog-page',
          component: require('@/components/MyBlog').default
        },
        {
          path: '/local-set',
          name: 'local-set',
          component: require('@/components/LocalDataSet').default
        },
        {
          path: '/cookie-set',
          name: 'cookie-set',
          component: require('@/components/CookieSet').default
        },
        { path: '*', redirect: '/blog-page' }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
