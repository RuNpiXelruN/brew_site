import Vuex from 'vuex';
import Vue from 'vue';
import beers from './modules/beers'
import brewers from './modules/brewers'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        beers,
        brewers
    }
})