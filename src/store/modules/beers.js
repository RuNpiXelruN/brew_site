import api from '../../api/app.service'

const state = {
    beers: [],
    currentBeer: null,
    basicBeers: [],
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

const actions = {
    async initBasicBeers({ commit }) {
        try {
            let response = await api.getBasicBeers()
                commit('setBasicBeers', response)
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async deleteBeer({ dispatch }, params) {
        try {
            let response = await api.deleteBeer(params.id)
                if (response.status == 200) {
                    dispatch('initBeers')
                    return response.statusText
                } else {
                    console.log("Error", response.status)
                }
        } catch (err) {
            console.log('​}catch -> err', err);            
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

    async updateBeer({ dispatch }, params) {
        try {
            let response = await api.updateBeer(params.id, params.data)        
                if (response.status == 200) {
                    dispatch('initBeers')
                    return response.statusText
                }
        } catch(err) {
            console.log('​asyncupdateBeers -> err', err);
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

const getters = {
    basicBeers: (state) => state.basicBeers,
    beers: (state) => state.beers,
    currentBeer: (state) => state.currentBeer    
}

export default{
    state,
    getters,
    actions,
    mutations
}