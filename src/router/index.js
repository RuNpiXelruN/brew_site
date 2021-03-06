import Vue from 'vue'
import Router from 'vue-router'
import AppMain from '@/components/AppMain'
import Beers from '@/components/Beers'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
