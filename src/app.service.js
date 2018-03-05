import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

const appService = {

  async getBeers(limit, order, offset) {
    try {
      let data = await axios.get(`/beers?limit=${limit}&order=${order}&offset=${offset}`)
      return data.data
    } catch(err) {
      console.log("Error: ", err);
    }
  },

  async getBeersWithStatus(status, limit, order, offset) {
    try {
      let data = await axios.get(`/beers?status=${status}&limit=${limit}&order=${order}&offset=${offset}`)
      return data.data
    } catch(err) {
      console.log("error: ", err)
    }
  },

  async getBasicBeers() {
    try {
      let result = await axios.get(`/beers/basic`)
      return result.data
    } catch(err) {
      console.log("Error fetching basic beers");
    }
  },

  async getBrewerNames() {
    try {
      let result = await axios.get(`/brewers/names`)
      return result.data
    } catch(err) {
      console.log("error: ", err)
    }
  },


  async createBeer(data) {
    let token = window.localStorage.getItem('auth_token')
    try {
      let result = await axios.post(`/beers`, data, {
        withCredentials: true,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'auth_token': token
        }
      })
      return result.data
    } catch(err) {
      console.log("error: ", err)
    }
  },

  async createBrewer(data) {
    let token = window.localStorage.getItem("auth_token")
    try {
      let result = await axios.post("/brewers", data, {
        withCredentials: true,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'auth_token': token
        }
      })
      console.log("RESSSS", result);
    } catch(err) {
      console.log("There was an erro creating brewer", err);
    }
  },

  async uploadImage(data) {
    let token = window.localStorage.getItem("auth_token")
    try {
      let result = await axios.post(`/beers/newimage`, data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'auth_token': token
        }
      })
    } catch(err) {
      console.log("There was an error uploading the image");
    }
  },

  async checkSession(token) {
    try {
      let result = await axios.post("/", "", {
        headers: {
          'accept': 'application/json',
          'auth_token': token
        }
      })
      return result.data
    } catch(err) {
      console.log("error: ", err);
    }
  },

  async login(data) {
    var token = window.localStorage.getItem('auth_token') ? window.localStorage.getItem('auth_token') : ""
    try {
      let result = await axios.post(`/login`, data, {
        headers: {
          'accept': 'application/json',
          'auth_token': token
        }
      })
      return result.data
    } catch(err) {
      console.log("There was an error posting login details ", err)
    }
  },

  async logout(token) {
    try {
      let result = await axios.post(`/logout`, "", {
        headers: {
          'accept': 'application/json',
          'auth_token': token
        }
      })
      return result.data
    } catch (err) {
      console.log("Error trying to logout: ", err);
    }
  },

  async checkAdminEmail(data) {
    try {
      let result = await axios.post(`/validateOAuth`, data, {
        withCredentials: true,
        headers: {
          'accept': 'application/json'
        }
      })
      return result.data
    } catch(err) {
      console.log("Error from async: ", err);
    }
  },

  async getBrewerRanks() {
    try {
      let result = await axios.get(`/ranks`)
      return result.data
    } catch(err) {
      console.log("There was an error fetching ranks", err);
    }
  }

  // async test() {
  //   try {
  //     let results = await Promise.all([
  //       console.log("here"),
  //       console.log("there")
  //     ])
  //     console.log("results", results);
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }
}

export default appService
