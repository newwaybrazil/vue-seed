<template>
    <div>
        <el-row class="mb-2">
            <span class="title">
                Formulário de Usuário
            </span>
        </el-row>
        <el-row class="mb-3">
            <span class="subtitle">
                O formulário de usuário é bem simples. Preencha abaixo e escolha a sua ação.
            </span>
        </el-row>
        <hr>
        <el-row>
            <el-form
            label-position="top"
            label-width="100px">
                <el-form-item>
                    <label>
                        <span class="text-danger">*</span>
                        <span class="input-label">Nome:</span>
                    </label>
                    <el-input
                    v-model="user.username"
                    placeholder="Nome"
                    clearable>
                    </el-input>
                    <span class="input-description">
                        O nome do usuário deve ser relevante e único.
                    </span>
                </el-form-item>
                <el-form-item>
                    <label>
                        <span class="input-label">Senha:</span>
                    </label>
                    <el-input
                    type="password"
                    v-model="user.password"
                    placeholder="Senha">
                    </el-input>
                    <span class="input-description">
                        Lembre-se que a senha deve conter no mínimo <b>8</b> caracteres, sendo um número, um caracter maiúsculo e um símbolo especial.
                    </span>
                </el-form-item>
                <el-form-item>
                    <el-button
                    type="info"
                    plain
                    @click="cancel">
                        <i class="fas fa-fw fa-undo"></i>
                        Cancelar
                    </el-button>
                    <el-button
                    type="success"
                    @click="save"
                    :disabled="!validateData()">
                        <i class="fas fa-fw fa-save"></i>
                        Salvar
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
// Mixins
import { validators } from '@/mixins/validators'
// Services
import users from '@/services/vue-seed/users'
// import groups from '@/services/vue-seed/groups'

export default {
    name: 'UsersEditContent',
    mixins: [validators],
    data () {
        return {
            user: {},
            // groups: [],
            changePassword: false,
            confirmPassword: null
        }
    },
    created () {
        // Get ID from current route
        let id = this.$route.params.id

        // Check if user already exists or not, if it does fetch from API
        if (id !== undefined && id !== 'new') {
            this.getUser(id)
        } else {
            this.user = this.newUser()
        }

        // Also fetch groups and companies from API
        // this.getGroups()
    },
    methods: {
        toggleGroup (group) {
            if (!this.hasGroup(group)) {
                this.user.groups.push(group)
            } else {
                this.user.groups.splice(this.user.groups.indexOf(group), 1)
            }
        },
        hasGroup (group) {
            if (this.user && this.user.groups) {
                return !!this.user.groups.filter(g => { return g.id === group.id }).length
            }
        },
        newUser () {
            return {
                password: '',
                username: ''
                // groups: []
            }
        },

        // Gets an user based on its ID
        async getUser (id) {
            users.find({'id': id}).then(
                res => {
                    this.user = res.data
                    if (!this.user.groups) {
                        // this.user.groups = []
                    }
                },
                () => {
                    this.$notify.error({
                        title: 'Operação inválida!',
                        message: 'Houve um erro inesperado ao recuperar o usuário. Por favor, tente novamente.'
                    })
                }
            )
        },
        // Gets all groups from API
        async getGroups () {
            // groups.all().then(
            //     res => {
            //         this.groups = res.data
            //     },
            //     () => {
            //         this.$notify.error({
            //             title: 'Operação inválida!',
            //             message: 'Houve um erro inesperado ao recuperar os grupos. Por favor, tente novamente.'
            //         })
            //     }
            // )
        },

        // Validates the data before changing to step 2
        validateData () {
            if (this.user.id !== undefined) {
                return this.isStringLengthValid(this.user.username)
            } else {
                return this.isStringLengthValid(this.user.username) && this.isStringLengthValid(this.user.password)
            }
        },

        async save () {
            // TODO
            // // If user already exists

            // Call creation service
            console.log(this.user)
            users.create(this.user).then(
                res => {
                    // Pushing back to UsersContent component
                    this.$router.push({name: 'UsersContent'})
                    this.$notify.success({
                        title: 'Operação realizada!',
                        message: 'O usuário foi criado com sucesso.'
                    })
                },
                () => {
                    this.$notify.error({
                        title: 'Operação inválida!',
                        message: 'Houve um erro inesperado ao criar o usuário. Por favor, tente novamente.'
                    })
                }
            )
        },

        cancel () {
            this.$router.push({name: 'UsersContent'})
        }

    }
}
</script>

<style lang="scss" scoped>
</style>
