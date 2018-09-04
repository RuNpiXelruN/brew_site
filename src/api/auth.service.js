import axios from 'axios'

const instance = axios.create({
    baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty"
  })

const API_KEY = "AIzaSyDSEOgRSwrP7t0tOtrSzt5ff5BhTx_ENq0"

const authService = {
    async signUp(email, password) {
        try {
            let response = await axios.post(`signupNewUser?key=${API_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            })

            console.log('​asyncsignUp -> response', response);            
        } catch(err) {
            console.log("Error in authService ", err)
        }
    }
}

export default instance