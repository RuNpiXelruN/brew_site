// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import GAuth from 'vue-google-oauth2'
import store from './store'
import('../node_modules/vuetify/dist/vuetify.min.css')
import './assets/scss/index.scss'


Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    bgMain: '#FFF8E2'
  }
})

Vue.use(GAuth, {
    clientId: process.env.GAUTH_CLIENT_ID,
    scopes: [
		"https://www.googleapis.com/auth/userinfo.email",
    ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
