import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const Cart = () =>
    import ('views/cart/Cart')
const Category = () =>
    import ('views/category/Category')
const Home = () =>
    import ('views/home/Home')
const Profile = () =>
    import ('views/profile/Profile')
const Detail = () =>
    import ('views/detail/Detail')

const routes = [{
        path: '/home',
        component: Home
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/category',
        component: Category
    },

    {
        path: '/profile',
        component: Profile

    },
    {
        path: '/detail/:iid',
        component: Detail
    }

]

const router = new VueRouter({
    routes,
    mode: 'history'

})

export default router