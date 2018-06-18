import Vue from 'vue'
import Router from 'vue-router'

// Lazy loading components below
const ImageUploader = () => System.import('@/components/ImageUploader')
const CreateBeer = () => System.import('@/components/CreateBeer')
const CreateBrewer = () => System.import('@/components/CreateBrewer')
const Beers = () => System.import('@/components/Beers')
const AppMain = () => System.import('@/components/AppMain')
const Login = () => System.import('@/components/Login')
const EditBeer = () => System.import('@/components/EditBeer')

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
      path: '/brewers/new',
      secure: true,
      name: 'createBrewer',
      component: CreateBrewer
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
    },
    {
      path: '/beers/:id/edit',
      name: "editBeer",
      component: EditBeer
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
