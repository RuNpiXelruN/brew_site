// import authApi from '../../api/auth.service'
import api from '../../api/app.service.js'

const state = {
    idToken: null,
    userId: null,
}

const getters = {
    authed: (state) => state.authed
}

const actions = {
    async goSignup() {
        try {
            let url = await api.goSignup()
            // console.log('TCL: asyncgoSignup -> url', url);

            // let authWindow = window.open(url)
            
            // setinterval {
            //     // window is closed? 

            //     if authWindow.location.path === redirectURI {
            //         let authPayload = json.jsnonify(authWindow.document.body.innerText)
            //         success
            //         authWindow.close()
            //     } else {
            //         setInterval again
            //     }
            // }
            // authWindow.onload = {
                // CHECK PAGE RELOAD for API AUTH REDIRECT
                // BLOCK LOAD
                // GET JSON PAYLOAD
                // CLOSE WINDOW
            // }
        } catch (err) {
            console.log("Errorrrr", err)
        }
    }
    // async signUp({ commit }, authData) {
    //     try {
    //         let data = await authApi.signUp(authData.email, authData.password)
    //         console.log('​asyncsignUp -> data', data);
    //     } catch(err) {
    //         console.log("Error in auth vuex ", err)
    //     }
    // }
}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}