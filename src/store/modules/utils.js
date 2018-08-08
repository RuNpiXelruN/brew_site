const state = {
    popup: {
        text: "",
        state: false,
        timeout: 5000,
    }
}

const getters = {
    popup: (state) => state.popup
}

const actions = {
    createPopup({ commit }, params) {
        commit('setPopup', params)
    }
}

const mutations = {
    setPopup: (state, message) => {
        state.popup = {
            text: message.text ? message.text : "",
            state: message.state ? message.state : false,
            timeout: message.timeout ? message.timeout : 5000,
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}