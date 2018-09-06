import api from '../../api/app.service.js'

const state = {
    authToken: null,
    userId: null,
}

const getters = {
    isAuthed: (state) => !!state.authToken,
    token: (state) => state.authToken
}

const actions = {
    tryAutoLogin({ commit }) {
        let token = localStorage.getItem("BrewToken")
        if (!token) {
            return
        }
        let userId = localStorage.getItem("user_id")
        commit("autoAuthUser", {token, userId})
    },

    async login({commit}, params) {
        try {
            let response = await api.login(params.code, params.redirect_uri)
            localStorage.setItem("BrewToken", response.headers.brewtoken)
            localStorage.setItem("user_id", response.data.id)
            commit('setAuth', {userId: response.data.userId, token: response.headers.brewtoken})
        } catch (err) {
            console.log('TCL: }catch -> err', err);            
        }
    },
    logout({commit}) {
        commit('setLogout')
    }
}

const mutations = {
    autoAuthUser: (state, params) => {
        state.authToken = params.token
        state.userId = params.userId
    },

    setAuth: (state, params) => {
        state.authToken = params.token
        state.userId = params.userId
    },
    setLogout: (state) => {
        localStorage.removeItem("BrewToken")
        localStorage.removeItem("user_id")
        state.authToken = null
        state.userId = null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}