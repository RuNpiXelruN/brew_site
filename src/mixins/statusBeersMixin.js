export const statusBeersMixin = (status, limit) => {
    return {
        computed: {
            beers() {
                let beerArray = []
                if (limit != null) {
                    beerArray = this.$store.getters.beers.filter(beer => {
                        return beer.status.match(status)
                    })
                    return beerArray.slice(0, limit)
                } else {
                    beerArray = this.$store.getters.beers.filter(beer => {
                        return beer.status.match(status)
                    })
                    return beerArray
                }
            }
        }
    }    
}