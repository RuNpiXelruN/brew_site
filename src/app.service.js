import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

const appService = {
  getBeers(limit, order, offset) {
    return new Promise((resolve, reject) => {
      axios.get(`/beers?limit=${limit}&order=${order}&offset=${offset}`)
      .then(data => {
        resolve(data.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getBeersWithStatus(status, limit, order, offset) {
    return new Promise((resolve, reject) => {
      // if (window.localStorage.getItem(`${status}_beers`)) {
      //   let data = window.localStorage.getItem(`${status}_beers`)
      //   resolve(JSON.parse(data))
      // } else {
        axios.get(`/beers?status=${status}&limit=${limit}&order=${order}&offset=${offset}`)
        .then(data => {
          // window.localStorage.setItem(`${status}_beers`, JSON.stringify(data.data))
          resolve(data.data)
        }).catch(err => {
          reject(err)
        })
      // }
    })
  }
}

export default appService
