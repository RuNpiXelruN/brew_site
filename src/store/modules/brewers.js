import api from '../../api/app.service'

const state = {
    brewers: [],
    basicBrewers: []
}

const getters = {
    brewers: state => state.brewers,
    basicBrewers: state => state.basicBrewers
}
const actions = {
    async fetchBrewers({ commit }, params) {
        let limit, order, offset
        if (params) {
            limit = params.limit ? params.limit : ""
            order = params.order ? params.order : ""
            offset = params.offset ? params.offset : ""
        }        
        
        try {
            let response = await api.getBrewers(limit, order, offset)
                console.log('​response -> response', response);  
                // commit('setBrewers', response.data)              
        } catch (error) {
            console.log('​}catch -> error', error);            
        }
    }
}
const mutations = {
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