<template>
    <div>
        <header-section ref="headerSection"></header-section>
        <div class="d-flex justify-content-center align-items-center" :style="{ 'min-height': `calc(100vh - ${headerHeight})`}">
            <div class="form-wrap">
                <div class="tabs">
                    <h3 class="signup-tab"><router-link active-class="active" exact to="register">Sign Up</router-link></h3>
                    <h3 class="login-tab"><router-link active-class="active" to="login">Login</router-link></h3>
                </div>

                <div class="tabs-content">
                    <div class="alert alert-danger" v-if="(register_error && REGISTER_ACTION === currentRouterName) || (login_error && LOGIN_ACTION === currentRouterName)">
                        <p v-if="register_error">Here was an error, unable to complete registration.</p>
                        <p v-if="login_error">Sign in fail. Please try again!</p>
                    </div>
                    <div id="signup-tab-content" :class="{active:REGISTER_ACTION === currentRouterName}">
                        <form class="signup-form"  @submit.prevent="register">
                            <input v-model="name" type="text" class="input" placeholder="Username" :class="{ 'is-valid': register_errors.name }">
                            <span class="help-block" v-if="register_error && register_errors.name">{{ register_errors.name[0] }}</span>

                            <input v-model="email" type="email" class="input" placeholder="Email" :class="{ 'is-valid': register_errors.email }">
                            <span class="help-block" v-if="register_error && register_errors.email">{{ register_errors.email[0] }}</span>

                            <input v-model="password" type="password" class="input" placeholder="Password" :class="{ 'is-valid': register_errors.password }">
                            <span class="help-block" v-if="register_error && register_errors.password">{{ register_errors.password[0] }}</span>

                            <input v-model="password_confirmation" type="password" class="input" placeholder="Password Confirmation" :class="{ 'is-valid': register_errors.password_confirmation }">
                            <span class="help-block" v-if="register_error && register_errors.password_confirmation">{{ register_errors.password_confirmation[0] }}</span>
                            <input type="submit" class="button" value="Sign Up" >
                        </form>
                        <div class="help-text">
                            <p>By signing up, you agree to our</p>
                            <p><a href="#">Terms of service</a></p>
                        </div>
                    </div>

                    <div id="login-tab-content" :class="{active:LOGIN_ACTION === currentRouterName}">
                        <form class="login-form" @submit.prevent="login">
                            <input v-model="email" type="text" class="input" placeholder="Email">
                            <input v-model="password" type="password" class="input" placeholder="Password">
                            <input type="checkbox" class="checkbox" id="remember_me">
                            <label for="remember_me">Remember me</label>

                            <input type="submit" class="button" value="Login">
                        </form>
                        <div class="help-text">
                            <p><a href="#">Forget your password?</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderSection from '../header-section'

    const REGISTER_ACTION = 'register'
    const LOGIN_ACTION = 'login'
    export default {
        name: "auth",
        data() {
            return {
                REGISTER_ACTION: REGISTER_ACTION,
                LOGIN_ACTION: LOGIN_ACTION,
                headerHeight: 0,
                email: '',
                name: '',
                password: '',
                password_confirmation: '',
                login_url : '/api/auth/login',
                register_url: '/api/auth/register',
                login_error: false,
                register_error: false,
                register_errors: {}
            }
        },
        computed: {
          currentRouterName() {
              return this.$route.name
          },
        },
        methods: {
            register() {
                this.handleRequestAuth(this.register_url, {
                    email: this.email,
                    name: this.name,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                }).then(() => {
                    this.$toasted.success('Registration completed.')
                }).catch((e) => {
                    this.login_error = false;
                    this.register_error = true;
                    if (typeof e.data.message != 'undefined' && typeof e.data.errors != 'undefined') {
                        this.register_errors = e.data.errors
                    }
                });
            },
            login() {
                this.handleRequestAuth(this.login_url, {
                    email: this.email,
                    password: this.password,
                }).then(() => {
                    this.$toasted.success('Login completed.')
                }).catch(() => {
                    this.login_error = true;
                    this.register_error = false;
                });
            },
            handleRequestAuth(url, data) {
                let that = this;
                return new Promise(function(resolve, reject){
                    Vue.axios.post(url, data).then((response) => {
                        if (typeof response.data.access_token != 'undefined' && typeof response.data.user != 'undefined') {
                            localStorage.setItem('user-token', response.data.access_token)
                            localStorage.setItem('user-info', JSON.stringify(response.data.user))
                            that.$router.push('/');
                            resolve();
                        } else {
                            reject();
                        }
                    }).catch((e) => {
                        localStorage.clear();
                        reject(e.response);
                    })
                })
            },
        },
        components: {
            HeaderSection
        },
        mounted () {
            this.headerHeight = this.$refs.headerSection.$el.clientHeight + 'px';
        },
    }
</script>

<style scoped>
    @import url(https://fonts.googleapis.com/css?family=Raleway:400,100,200,300);

    a {
        color: #666;
        text-decoration: none; }
    a:hover {
        color: #4FDA8C; }

    .form-wrap {
        background-color: #fff;
        width: 320px;
        margin: 3em auto;
        box-shadow: 0px 1px 8px #BEBEBE;
        -webkit-box-shadow: 0px 1px 8px #BEBEBE;
        -moz-box-shadow: 0px 1px 8px #BEBEBE;
    }

    .form-wrap .tabs {
        overflow: hidden;
    }

    .form-wrap .tabs h3 {
        float: left;
        width: 50%;
    }

    .form-wrap .tabs h3 a {
        padding: 0.5em 0;
        text-align: center;
        font-weight: 400;
        background-color: #e6e7e8;
        display: block;
        color: #666;
    }

    .form-wrap .tabs h3 a.active {
        background-color: #fff;
    }

    .form-wrap .tabs-content {
        padding: 1.5em;
    }

    .form-wrap .tabs-content div[id$="tab-content"] {
        display: none;
    }

    .form-wrap .tabs-content .active {
        display: block !important;
    }

    .form-wrap form .is-valid {
        border: 1px solid red!important;
    }

    .form-wrap form .help-block {
        display: block;
        color: red;
        margin-bottom: 0.8rem;
        transform: translateY(-0.5rem);
    }

    .form-wrap form .input {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        color: inherit;
        font-family: inherit;
        padding: .8em 0 10px .8em;
        border: 1px solid #CFCFCF;
        outline: 0;
        display: inline-block;
        margin: 0 0 .8em 0;
        padding-right: 2em;
        width: 100%;
    }

    .form-wrap form .button {
        width: 100%;
        padding: .8em 0 10px .8em;
        background-color: #28A55F;
        border: none;
        color: #fff;
        cursor: pointer;
        text-transform: uppercase;
    }

    .form-wrap form .button:hover {
        background-color: #4FDA8C;
    }

    .form-wrap form .checkbox {
        visibility: hidden;
        padding: 20px;
        margin: .5em 0 1.5em;
    }

    .form-wrap form .checkbox:checked + label:after {
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
        filter: alpha(opacity=100);
        opacity: 1;
    }

    .form-wrap form label[for] {
        position: relative;
        padding-left: 20px;
        cursor: pointer;
    }

    .form-wrap form label[for]:before {
        content: '';
        position: absolute;
        border: 1px solid #CFCFCF;
        width: 17px;
        height: 17px;
        top: 0px;
        left: -14px;
    }

    .form-wrap form label[for]:after {
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
        opacity: 0;
        content: '';
        position: absolute;
        width: 9px;
        height: 5px;
        background-color: transparent;
        top: 4px;
        left: -10px;
        border: 3px solid #28A55F;
        border-top: none;
        border-right: none;
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .form-wrap .help-text {
        margin-top: .6em;
    }

    .form-wrap .help-text p {
        text-align: center;
        font-size: 14px;
        margin-bottom: 0;
    }

</style>
