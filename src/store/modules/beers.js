import api from '../../api/app.service.js'

const state = {
    beers: [],
    currentBeer: null,
    basicBeers: [],
}

const getters = {
    basicBeers: (state) => state.basicBeers,
    beers: (state) => state.beers,
    currentBeer: (state) => state.currentBeer    
}

const actions = {
    async initBasicBeers({ commit }) {
        try {
            let response = await api.getBasicBeers()
                commit('setBasicBeers', response)
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async updateBeer({ dispatch, rootState }, params) {
        if (!rootState.auth.authToken) {
            return {status: 403, statusText: "You must be logged in to perform this action."}
        }

        try {
            let response = await api.updateBeer(params.id, params.data, rootState.auth.authToken)        
                dispatch('initBeers')
                return response
        } catch(err) {
            return Object.assign({}, err)
        }
    },

    async deleteBeer({ dispatch, rootState }, params) {        
        if (!rootState.auth.authToken) {
            return {status: 403, statusText: "You must be logged in to perform this action."}
        }
            
        try {
            let result = await api.deleteBeer(params.id, rootState.auth.authToken)
                if (result.status == "200") {
                    dispatch('initBeers')
                    return result
                } else {
                    return result.response
                }                
        } catch (err) {
            return Object.assign({}, err)
        }
    },

    async createBeer({ dispatch }, formData) {
        try {                        
            let response = await api.createBeer(formData.params)
            if (response.status == 200) {
                dispatch('initBeers')
            } else {
                console.log("Errrrr")
            }                
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async initBeers({commit}) {
        try {
            let beers = await api.getAllBeers()
            commit('setBeers', beers)
        } catch(err) {
            console.log('​}catch -> err', err);            
        }        
    },

    async fetchCurrentBeer({ commit }, params) {
        try {
            let response = await api.getBeer(params.id)     
            commit('setCurrentBeer', response)

        } catch(err) {
            console.log('​}catch -> err', err);
        }
    },
}

const mutations = {
    setBasicBeers: (state, beers) => {
        state.basicBeers = beers
    },
    setBeers: (state, beers) => {
        state.beers = beers
    },
    setCurrentBeer: (state, beer) => {
        state.currentBeer = beer
    },

    addBeer: (state, beer) => {
        state.beers = state.beers.push(beer)   
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}