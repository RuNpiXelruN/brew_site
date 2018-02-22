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

  async getBrewerNames() {
    try {
      let data = await axios.get(`/brewers/names`)
      return data
    } catch(err) {
      console.log("error: ", err)
    }
  },


  async createBeer(data) {
    try {
      let result = await axios.post(`/beers`, data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      return result.data
    } catch(err) {
      console.log("error: ", err)
    }
  },

  uploadImage(data) {
    return new Promise((resolve, reject) => {
      axios.post(`/beers/newimage`, data, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
    })
  },

  async checkSession(token) {
    try {
      let result = await axios.post("/", "", {
        headers: {
          'accept': 'application/json',
          'brewToken': token
        }
      })
      return result.data
    } catch(err) {
      console.log("error: ", err);
    }
  },

  async login(data) {
    var token = window.localStorage.getItem('brewToken') ? window.localStorage.getItem('brewToken') : ""
    try {
      let result = await axios.post(`/login`, data, {
        headers: {
          'accept': 'application/json',
          'brewToken': token
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
          'brewToken': token
        }
      })
      return result.data
    } catch (err) {
      console.log("Error trying to logout: ", err);
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
