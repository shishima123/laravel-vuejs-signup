<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Navbar</a>
        <span v-if="authCheck()">Hello {{ getAuth().name }}</span>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-md-flex justify-content-md-end" id="navbarNav">
            <ul class="navbar-nav">
                <router-link v-if="authCheck()" tag="li" class="nav-item" active-class="active" exact :to="{ name: 'home.index' }">
                    <a class="nav-link">Home</a>
                </router-link>
                <router-link v-if="!authCheck()" tag="li" class="nav-item" active-class="active" :to="{ name: 'register' }">
                    <a class="nav-link">Register</a>
                </router-link>
                <router-link v-if="!authCheck()" tag="li" class="nav-item" active-class="active" :to="{ name: 'login' }">
                    <a class="nav-link">Login</a>
                </router-link>
                <li v-if="authCheck()" class="nav-item">
                    <a class="nav-link" @click="logout" href="#">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import { authCheck, getAuth } from "../util/helpers";

    export default {
        name: "header-section",
        methods: {
            authCheck() {
                return authCheck();
            },
            getAuth() {
                return getAuth();
            },
            logout() {
                Vue.axios.post('api/auth/logout').then((response) => {
                    if (typeof response.data.message != 'undefined') {
                        this.$toasted.success(response.data.message)
                        localStorage.clear();
                        this.$router.push({name:'login'});
                    } else {
                        this.$toasted.error('Logout Fail.')
                    }
                }).catch((e) => {
                    this.$toasted.error('Logout Fail.')
                })
            }
        }
    }
</script>

<style scoped>

</style>
