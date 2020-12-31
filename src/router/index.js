import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../pages/Login'
import IndexPage from '../pages/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/index',
      component: IndexPage,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/login',
      component: LoginPage
    }
  ]
})
