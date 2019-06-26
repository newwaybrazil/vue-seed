<template>
    <div class="content-column" id="login">
        <!-- <img src="../../../assets/img/munin_colored.png" width="60px"> -->
        <el-main id="login">
            <el-col :span="8" :offset="8" class="login-widget-container">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{ appName }}</span>
                    </div>
                    <el-form ref="form"  label-width="120px">
                        <el-form-item label="Username">
                            <el-input placeholder="Digite seu usuário" v-model="username"></el-input>
                        </el-form-item>
                        <el-form-item label="Password">
                            <el-input type="password" placeholder="Digite sua senha"
                            @keyup.enter.native="onSubmit()"
                            v-model="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="login-button" @click="onSubmit">Login</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-main>
    </div>
</template>

<script>
// Vuex-related functions
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'TheLogin',
    data () {
        return {
            username: '',
            password: ''
        }
    },
    computed: mapGetters({
        appName: 'appName',
        status: 'status'
    }),
    methods: {
        ...mapActions(['login']),
        onSubmit () {
            localStorage.setItem('token', 'somearbitraryandtemporarytoken')
            this.$router.push('/')
        },
        // Dispatchs a login action when button is clicked
        onSubmitLoginBackend () {
            // Gather user data from form
            let data = {
                username: this.username,
                password: this.password
            }

            // Call login service
            this.login(data).then(
                // If succesfull, procceed to dashboard
                res => {
                    this.$router.push('/')
                },
                // If not, remove the user's access token and display an error box
                () => {
                    localStorage.removeItem('token')
                    this.$alert('Não foi possível realizar o login. Por favor, tente novamente.', 'Acesso inválido!', {
                        confirmButtonText: 'OK',
                        type: 'error',
                        callback: action => {
                        }
                    })
                    // this.$swal({
                    //     type: 'error',
                    //     title: `<h4>Acesso inválido!</h4>`,
                    //     text: 'Não foi possível realizar o login. Por favor, tente novamente.',
                    //     showCloseButton: false,
                    //     heightAuto: false
                    // })
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
#login {
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.login-widget-container {
   margin-top:10%;
}
.login-button{
    float:right;
}
form {
    width: inherit;
}
</style>
