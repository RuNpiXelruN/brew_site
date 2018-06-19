import api from "../../api/app.service"

const state = {
    brewingBeers: [],
    activeBeers: [],
    pastBeers: []
}

const getters = {
    brewingBeers: state => state.brewingBeers,
    activeBeers: state => state.activeBeers,
    pastBeers: state => state.pastBeers
}

const actions = {
    async fetchBrewingBeers({ commit }, params) {
        try {
            let response = await api.getBeers(params.status, params.limit, params.order, params.offset)
            commit('setBrewingBeers', response)
        } catch(err) {            
            console.log('​}catch -> err', err);            
        }
    },

    async fetchActiveBeers({ commit }, params) {
        try {
            let response = await api.getBeers(params.status, params.limit, params.order, params.offset)
            commit('setActiveBeers', response)
        } catch (err) {
            console.log('​}catch -> err', err);
        }
    },

    async fetchPastBeers({ commit }, params) {
        try {
            let response = await api.getBeers(params.status, params.limit, params.order, params.offset)
            commit('setPastBeers', response)
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    }
}

const mutations = {
    setBrewingBeers: (state, beers) => {        
        state.brewingBeers = beers
    },
    setActiveBeers: (state, beers) => {
        state.activeBeers = beers
    },
    setPastBeers: (state, beers) => {
        state.pastBeers = beers
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}