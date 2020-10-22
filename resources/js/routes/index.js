import App from '../App';
import Auth from '../components/Auth/auth';
export default [
    // Home
    {
        path: '/',
        name: 'home.index',
        component: App,
        meta: {
            requiresAuth: true
        }
    },

    // Login
    {
        path: '/login',
        name: 'login',
        component: Auth,
        meta: {
            requiresGuest: true
        }
    },

    // Register
    {
        path: '/register',
        name: 'register',
        component: Auth,
        meta: {
            requiresGuest: true
        }
    }
]
