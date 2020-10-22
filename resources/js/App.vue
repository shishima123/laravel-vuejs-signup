<template>
    <div id="app">
        <header-section />
        <router-view></router-view>
    </div>
</template>

<script>
    import AuthForm from './components/Auth/auth'
    import HeaderSection from './components/header-section'
    import { authCheck } from './util/helpers';

    export default {
        name: 'App',
        data() {
            return {}
        },
        methods: {
            getCurrentUser() {
                Vue.axios.post('api/auth/me').then((response) => {
                    console.log(response);
                }).catch((e) => {
                    localStorage.clear();
                })
            },
        },
        components: {
            AuthForm,
            HeaderSection
        },
        mounted() {
            if (authCheck()) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user-token')}`;
            }
        }
    }
</script>

<style scoped>

</style>
