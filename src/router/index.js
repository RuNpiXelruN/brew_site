import Vue from 'vue'
import Router from 'vue-router'
import AppMain from '@/components/AppMain'
import Beers from '@/components/Beers'
import CreateBeer from '@/components/CreateBeer'
import ImageUploader from '@/components/ImageUploader'
import AuthTest from '@/components/AuthTest'
import Login from '@/components/Login'

import vueScrollTo from 'vue-scroll-to';

// Vue.use(vueScrollTo, options);
Vue.use(vueScrollTo);

Vue.use(Router)

export default new Router({
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
      name: 'createBeer',
      component: CreateBeer
    },
    {
      path: '/imageupload',
      name: 'imageupload',
      component: ImageUploader
    },
    {
      path: '/authTest',
      name: 'authTest',
      component: AuthTest
    },
    {
      path: '/admin',
      name: 'admin',
      component: Login
    }
  ]
})
