import Vuex from 'vuex';
import Vue from 'vue';
import beers from './modules/beers'
import brewers from './modules/brewers'
import utils from './modules/utils'
import auth from './modules/auth'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        beers,
        brewers,
        utils,
        auth
    }
})