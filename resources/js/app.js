require('./bootstrap');

import VueRouter from 'vue-router'
import routes from './routes/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted';

window.Vue = require('vue');

window.Vue.use(VueRouter);

window.Vue.config.productionTip = false
window.Vue.config.devtools = true

window.Vue.use(VueAxios, axios)

let option = {
    theme: "toasted-primary",
    position: "top-right",
    duration : 5000
};

Vue.use(Toasted, option)

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.hasOwnProperty('user-token');

    // Redirect to the login page if the user is not logged in
    // and the route meta record is requires auth
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        next('/login')
    }

    // Redirect to the homepage page if the user is logged in
    // and the route meta record is requires guest
    if (to.matched.some(record => record.meta.requiresGuest) && isLoggedIn) {
        next('/')
    }

    // Pass any access if not match two conditions above
    next()
})

const app = new Vue({ router }).$mount('#app')
