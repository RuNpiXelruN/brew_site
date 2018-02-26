import Vue from 'vue'
import Router from 'vue-router'
import AppMain from '@/components/AppMain'
import Beers from '@/components/Beers'
import CreateBeer from '@/components/CreateBeer'
import ImageUploader from '@/components/ImageUploader'
import Login from '@/components/Login'
import AppService from '@/app.service'

import vueScrollTo from 'vue-scroll-to';
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
// Vue.use(vueScrollTo, options);
Vue.use(vueScrollTo);

Vue.use(Router)

export var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AppMain',
      component: AppMain
    },
    {
      path: '/beers',
      name: 'beers',
      component: Beers
    },
    {
      path: '/beers/new',
      secure: true,
      name: 'createBeer',
      component: CreateBeer
    },
    {
      path: '/imageupload',
      secure: true,
      name: 'imageupload',
      component: ImageUploader
    },
    {
      path: '/admin',
      secure: true,
      name: 'admin',
      component: Login
    }
  ]
})


router.beforeEach((to, from, next) => {
  router.options.routes.forEach((route) => {
    if (to.matched[0].path === route.path && route.secure) {
      if (!window.localStorage.getItem("auth_token")) {
        return next("/")
      }
      // TODO hit backend to check if valid token
    }
  })
  next()
})

export default router
