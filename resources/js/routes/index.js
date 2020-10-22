import App from '../App';
import Auth from '../components/Auth/auth';
import Home from '../components/home'
export default [
    // Home
    {
        path: '/',
        name: 'home.index',
        component: App,
        meta: {
            requiresAuth: true
        }, children: [
            {
                path: '',
                component: Home,
            }
        ]

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
