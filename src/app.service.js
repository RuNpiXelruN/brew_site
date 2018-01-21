import axios from 'axios'
import querystring from 'querystring'

axios.defaults.baseURL = 'http://localhost:8000'

// TODO use async/await

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
  },

  getBrewerNames() {
    return new Promise((resolve, reject) => {
      axios.get(`/brewers/names`)
      .then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  createBeer(data) {
    axios.post(`/beers`, data, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  imageTest(data) {
    axios.post(`/beers/s3Image`, data, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }}
    )
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
  }
  // imageTest(data) {
  //   axios.post(`/beers/imageTest`, data, {
  //     headers: {
  //       'accept': 'application/json',
  //       'Content-Type': 'multipart/form-data'
  //     }}
  //   )
  // }
  // test(name) {
  //   axios.post(`/beers/imageTest`, name, headers: {})
  // }
}

export default appService
