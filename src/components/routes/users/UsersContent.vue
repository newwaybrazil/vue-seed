<template>
    <div>
        <el-row class="mb-2">
            <span class="title">
                Usuários
            </span>
        </el-row>
        <el-row class="mb-3">
            <span class="subtitle">
                Alguém precisa nos usar, correto? Crie, altere ou edite os usuários do vue-seed!
            </span>
        </el-row>
        <hr>
        <el-row>
            <table-list
            :onNavigate="getUsers"
            :data="users"
            :columns="columns"
            :removeRow="removeRow"
            :editRow="editRow">
            </table-list>
        </el-row>
    </div>
</template>

<script>
// Mixins
import { tools } from '@/mixins/tools'
import { validators } from '@/mixins/validators'

// Components
import TableList from '@/components/tools/tables/TableList'

// Services
import users from '@/services/vue-seed/users'

export default {
    name: 'UsersContent',
    components: {
        TableList
    },
    mixins: [tools, validators],
    data () {
        return {
            total: 0, // total records for this listing
            // Columns to be shown
            columns: [
                {
                    key: 'username',
                    label: 'Usuário',
                    sortable: true
                }
            ],
            // Variable to hold the fetched users
            users: {}
        }
    },
    created () {
        // When component is created, fetch all the current users from vue-seed
        this.getUsers()
    },
    methods: {
        // This will fetch all the current users from vue-seed
        async getUsers (query) {
            let q = {}
            if (query) {
                q = {
                    size: query.pageSize,
                    page: query.page ? query.page - 1 : 0
                }
            }
            users.list(q).then(
                res => {
                    this.users = res.data
                },
                err => {
                    console.log(err)
                }
            )
        },
        async editRow (data) {
            let id = ''
            if (data._id) {
                id = data._id
            }
            if (data.id) {
                id = data.id
            }
            this.$router.push({ path: `${this.$route.path}/edit/${id}` })
        },

        async removeRow (data) {
            this.$alert('Você realmente deseja remover o usuário? Note que a operação não poderá ser desfeita.',
                'Atenção!', {
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonClass: 'el-button--success',
                    cancelButtonText: 'Cancelar',
                    cancelButtonClass: 'is-plain el-button--info',
                    type: 'warning',
                    callback: action => {
                        if (action === 'confirm') {
                            users.delete({id: data.id}).then(
                                res => {
                                    // Success box
                                    this.$notify.success({
                                        title: 'Operação realizada!',
                                        message: 'O usuário foi removido com sucesso.'
                                    })
                                    // Return query page as 0 when something is removed
                                    this.page = 0
                                    // Re-render faqs list after one has been excluded
                                    this.getUsers()
                                },
                                () => {
                                    // Error box
                                    this.$notify.error({
                                        title: 'Operação inválida!',
                                        message: 'Não foi possível remover o usuário. Por favor, tente novamente.'
                                    })
                                }
                            )
                        }
                    }
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
