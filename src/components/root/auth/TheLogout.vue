<template>
    <div
    class="the-logout"
    @click="submit()">
        <span>
            <i class="fas fa-fw fa-sign-out"></i>
            Sair
        </span>
    </div>
</template>

<script>
// Vuex actions
import { mapActions } from 'vuex'

export default {
    name: 'TheLogout',
    data () {
        return {}
    },
    methods: {
        ...mapActions(['logout']),
        // When logout button is clicked, dispatchs a logout action
        submit () {
            this.logout().then(
                // If successful, returns the user to login route
                res => {
                    this.$router.replace('/login')
                },
                // If not, sends an error
                err => {
                    console.log(err)
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
