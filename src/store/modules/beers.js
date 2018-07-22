import api from '../../api/app.service'

const state = {
    beers: [],
    currentBeer: null,
}

const mutations = {
    setBeers: (state, beers) => {
        state.beers = beers
    },
    setCurrentBeer: (state, beer) => {
        state.currentBeer = beer
    }
}

const actions = {
    async initBeers({commit}) {
        try {
            let beers = await api.getAllBeers()
            commit('setBeers', beers)
        } catch(err) {
            console.log('​}catch -> err', err);            
        }        
    },

    async updateBeer(_, params) {
        try {
            let response = await api.updateBeer(params.id, params.data)            
                if (response.status == 200) {
                    this.dispatch('initBeers')
                }
        } catch(err) {
            console.log('​asyncupdateBeers -> err', err);
        }
    },

    async fetchCurrentBeer({ commit, rootState }, params) {
        let includeBrewers = params.includeBrewers ? params.includeBrewers : null;

        try {
            let response = await api.getBeer(params.id, includeBrewers)
            
            if (response.brewers) {
                rootState.brewers.basicBrewers = response.brewers
                commit('setCurrentBeer', response.beer)
                return
            }
            commit('setCurrentBeer', response)

        } catch(err) {
            console.log('​}catch -> err', err);
        }
    },
}

const getters = {
    beers: (state) => state.beers,
    currentBeer: (state) => state.currentBeer
}

export default{
    state,
    getters,
    actions,
    mutations
}

// import api from "../../api/app.service"

// const state = {
//     allBeers: [],
//     brewingBeers: [],
//     activeBeers: [],
//     pastBeers: [],
//     currentBeer: null,
// }

// const getters = {
//     allBeers: state => state.allBeers,
//     activeBeers: state => {
//         return state.allBeers.filter(beer => beer.status == "active")
//     },

//     pastBeers: state => state.pastBeers,
//     brewingBeers: (state) => {        
//         return state.allBeers.filter(beer => beer.status == "brewing")
//     },

//     currentBeer: state => state.currentBeer,
// }

// const actions = {
//     async fetchBeers({commit}) {        
//         try {
//             let beers = await api.getAllBeers()
//             commit('setBeers', beers)

//         } catch (err) {
//         }
//     },

//     async updateBeer({ commit }, params) {
//         try {
//             let response = await api.updateBeer(params.id, params.data)
//             if (response.statusText == "OK") {
//                 this.dispatch('fetchBeers')
//             }
//             return response.statusText            
//         } catch (err) {
//         }
//     },

//     async fetchCurrentBeer({ commit, rootState }, params) {
//         let includeBrewers = params.includeBrewers ? params.includeBrewers : null;

//         try {
//             let response = await api.getBeer(params.id, includeBrewers)
//             if (response.brewers) {
//                 rootState.brewers.basicBrewers = response.brewers
//                 commit('setCurrentBeer', response.beer)
//                 return
//             }
//             commit('setCurrentBeer', response)
//         } catch (err) {
//         }
//     },
// }

// const mutations = {
//     setBeers: (state, beers) => {
//         state.allBeers = beers
//     },
//     setCurrentBeer: (state, beer) => {
//         state.currentBeer = beer
//     }    
// }

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }