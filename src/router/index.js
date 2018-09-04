import Vue from 'vue'
import Router from 'vue-router'

// Lazy loading components below
const AppMain = () => System.import('@/components/AppMain')
const CreateBeer = () => System.import('@/components/CreateBeer')
const CreateBrewer = () => System.import('@/components/CreateBrewer')
const EditBeer = () => System.import('@/components/EditBeer')
const EditBeerAll = () => System.import('@/components/EditBeerAll')
const EditBrewer = () => System.import('@/components/EditBrewer')
const SignUp = () => System.import('@/components/auth/SignUp')

// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)

Vue.use(Router)

export var router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            name: 'AppMain',
            component: AppMain,  
        },
        {
            path: '/beers/:id/edit',
            component: EditBeer,
            name: 'editBeer'
        },
        {
            path: '/beers/edit',
            component: EditBeerAll,
            name: 'editBeerAll'
        },
        {
            path: '/beers/new',
            component: CreateBeer,
            name: 'createBeer'
        },
        {
            path: '/brewers/new',
            component: CreateBrewer,
            name: 'createBrewer'
        },
        {
            path: '/brewers/edit',
            component: EditBrewer,
            name: 'editBrewer'
        },        
        {
            path: '/signup',
            component: SignUp,
            name: 'SignUp'
        },        
    ]
})

export default router
