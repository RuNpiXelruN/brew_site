import api from '../../api/app.service'

const state = {
    brewers: [],
    basicBrewers: [],
    brewerRanks: [],
}

const getters = {
    brewers: state => state.brewers,
    basicBrewers: state => state.basicBrewers,
    brewerRanks: state => state.brewerRanks
}
const actions = {
    async deleteBrewer({ dispatch }, params) {
        try {
            let response = await api.deleteBrewer(params.id)
            if (response.status == 200) {
                dispatch('initBrewers')
                return response.statusText
            } else {
                return response.statusText
            }
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async updateBrewer({ dispatch }, params) {
        try {
            let response = await api.updateBrewer(params.id, params.data)
            if (response.status == 200) {
                dispatch('initBrewers')
                return response.statusText
            } else {
                return response.statusText
            }
        } catch (err) {
            console.log('​}catch -> err', err);          
        }
    },

    async createBrewer({ dispatch }, formData) {
        try {
            let response = await api.createBrewer(formData)
            if (response.status == 200) {
                dispatch('initBrewers')
                return response.statusText
            } else {
                console.log("Error")
            }
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async initBrewerRanks({ commit }) {
        try {
            let response = await api.getBrewerRanks()
            commit('setBrewerRanks', response)
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async initBrewers({ commit }) {
        try {
            let brewers = await api.getBrewers()
            commit('setBrewers', brewers)
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async initBasicBrewers({ commit }) {
        try {
            let brewers = await api.getBasicBrewers()
            commit('setBasicBrewers', brewers)
        } catch (err) {
            console.log('​}catch -> err', err);            
        }

    },
}
const mutations = {
    setBrewerRanks(state, brewerRanks) {
        state.brewerRanks = brewerRanks
    },
    setBrewers(state, brewers) {
        state.brewers = brewers
    },
    setBasicBrewers(state, basicBrewers) {
        state.basicBrewers = basicBrewers
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}