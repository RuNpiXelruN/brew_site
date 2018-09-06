import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'
const appService = {        
    async login(code, redirect_uri) {
        try {
            let response = await axios.post(`/auth/callback?code=${code}&redirect_url=${redirect_uri}`, "", {
                withCredentials: true,
                headers: {
                    'accept': 'application/json',
                }
            })
            return response
        } catch(err) {
            console.log('TCL: }catch -> err', err);            
        }
    },
        
        // ************************ BEER ENDPOINTS ************************ //
    async getAllBeers() {
        try {
            let response = await axios.get(`/beers`)
            return response.data
        } catch(error) {
            console.log('​}catch -> error', error);            
        }
    },

    //  GET BEERS OF BREWING STATUS TYPE (for mixin)
    async getBeers(status, limit, order, offset) {      
        try {
            let data = await axios.get(`/beers?limit=${limit}&order=${order}&offset=${offset}&status=${status}`)
            return data.data

        } catch(err) {
            console.log("Error -> GET getBeers()");
        }
    },

    async getBeer(id) {      
        try {
            let data = await axios.get(`/beers/${id}`)      
            return data.data
        } catch (error) {
            console.log('​}catch -> error', error);          
        }      
    },

    async updateBeer(id, data, token) {
        try {
            let response = await axios.patch(`/beers/${id}`, data, {
                withCredentials: true,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'BrewToken': token
                }
            })
            return response
        } catch (error) {
            return Object.assign({}, error)          
        }
    },

    async createBeer(params) {
        try {
            let response = await axios.post(`/beers`, params, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            return response
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async deleteBeer(id, token) {
        try {
            let response = await axios.delete(`/beers/${id}`, {
                withCredentials: true,
                headers: {
                    'accept': 'application/json',
                    'BrewToken': token
                }
            })            
            return response
        } catch (error) {
            return Object.assign({}, error)
            // console.log('error', error);
            // console.log('errorType', typeof error);
            // console.log('error', Object.assign({}, error));
            // console.log('getOwnPropertyNames', Object.getOwnPropertyNames(error));
            // console.log('stackProperty', Object.getOwnPropertyDescriptor(error, 'stack'));
            // console.log('messageProperty', Object.getOwnPropertyDescriptor(error, 'message'));
            // console.log('stackEnumerable', error.propertyIsEnumerable('stack'));
            // console.log('messageEnumerable', error.propertyIsEnumerable('message'));            
        }
    },

    async getBasicBeers() {
        try {
            let response = await axios.get(`/beers/basic`)
            return response.data
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },
    
    // ************************ BREWER ENDPOINTS ************************ //
    async getBrewers(limit, order, offset) {
        try {
            let response = await axios.get(`/brewers`)
            return response.data
        } catch (error) {
            console.log('​}catch -> error', error);          
        }
    },

    async createBrewer(data) {
        try {
            let response = await axios.post(`/brewers`, data, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            return response
        } catch (err) {
            console.log('​axios }catch -> err', err);            
        }
    },
    
    
    async updateBrewer(id, data) {
        try {
            let response = await axios.patch(`/brewers/${id}`, data, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            return response
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async getBrewerRanks() {
        try {
            let response = await axios.get(`/ranks`)
            return response.data
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async deleteBrewer(id) {
        try {
            let response = await axios.delete(`/brewers/${id}`)
            return response
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },

    async getBasicBrewers() {
        try {
            let data = await axios.get(`/brewers/basic`)
            return data.data
        } catch (err) {
            console.log('​}catch -> err', err);            
        }
    },
}

export default appService

// axios.defaults.baseURL = 'http://localhost:8000/api'

// const appService = {
//     //         withCredentials: true,
//     //         headers: {
//     //           'accept': 'application/json',
//     //           'Content-Type': 'multipart/form-data',
//     //           'auth_token': token
//     //         }
    
//     // ************************ BEER ENDPOINTS ************************ //
//     async getAllBeers() {
//         try {
//             let response = await axios.get(`/beers`)
//             console.log('​get all beers', response);
//             return response.data
//         } catch(error) {
//             console.log('​}catch -> error', error);            
//         }
//     },

//     //  GET BEERS OF BREWING STATUS TYPE (for mixin)
//     async getBeers(status, limit, order, offset) {      
//         try {
//             let data = await axios.get(`/beers?limit=${limit}&order=${order}&offset=${offset}&status=${status}`)
//             return data.data

//         } catch(err) {
//             console.log("Error -> GET getBeers()");
//         }
//     },

//     async getBeer(id) {      
//         try {
//             let data = await axios.get(`/beers/${id}`)      
//             return data.data
//         } catch (error) {
//             console.log('​}catch -> error', error);          
//         }      
//     },

//     async updateBeer(id, data) {
//         try {
//             let response = await axios.patch(`/beers/${id}`, data, {
//                 headers: {
//                     'accept': 'application/json',
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//             })
//             return response
//         } catch (error) {
//             console.log('​}catch -> error', error);            
//         }
//     },

//     async createBeer(params) {
//         try {
//             let response = await axios.post(`/beers`, params, {
//                 headers: {
//                     'accept': 'application/json',
//                     'Content-Type': 'multipart/form-data',
//                 }
//             })
//             return response
//         } catch (err) { 1   
//             console.log('​}catch -> err', err);            
//         }
//     },

//     async deleteBeer(id) {
//         try {
//             let response = await axios.delete(`/beers/${id}`)
//             return response
//         } catch (error) {
//             console.log('​}catch -> error', error);            
//         }
//     },

//     async getBasicBeers() {
//         try {
//             let response = await axios.get(`/beers/basic`)
//             return response.data
//         } catch (err) {
//             console.log('​}catch -> err', err);            
//         }
//     },
    
//     // ************************ BREWER ENDPOINTS ************************ //
//     async getBrewers(limit, order, offset) {
//         try {
//             let response = await axios.get(`/brewers`)
//             return response.data
//         } catch (error) {
//             console.log('​}catch -> error', error);          
//         }
//     },

//     async createBrewer(data) {
//         try {
//             let response = await axios.post(`/brewers`, data, {
//                 headers: {
//                     'accept': 'application/json',
//                     'Content-Type': 'multipart/form-data',
//                 }
//             })
//             return response
//         } catch (err) {
//             console.log('​axios }catch -> err', err);            
//         }
//     },
  
    
//     async updateBrewer(id, data) {
//         try {
//             let response = await axios.patch(`/brewers/${id}`, data, {
//                 headers: {
//                     'accept': 'application/json',
//                     'Content-Type': 'multipart/form-data',
//                 }
//             })
//             return response
//         } catch (err) {
//             console.log('​}catch -> err', err);            
//         }
//     },

//     async getBrewerRanks() {
//         try {
//             let response = await axios.get(`/ranks`)
//             return response.data
//         } catch (err) {
//             console.log('​}catch -> err', err);            
//         }
//     },

//     async deleteBrewer(id) {
//         try {
//             let response = await axios.delete(`/brewers/${id}`)
//             return response
//         } catch (err) {
//             console.log('​}catch -> err', err);            
//         }
//     },

//     async getBasicBrewers() {
//         try {
//             let data = await axios.get(`/brewers/basic`)
//             return data.data
//         } catch (err) {
//             console.log('​}catch -> err', err);            
//         }
//     },
// }

// export default appService

// withCredentials: true,
// headers: {
//     'accept': 'application/json',
//     'brew_token': "testttt",
//   //   'Content-Type': 'multipart/form-data',
//   }