import Vuex from 'vuex';
import Vue from 'vue';
import beers from './modules/beers'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        beers
    }
})