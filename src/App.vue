<template>
    <div
    id="main-container"
    v-loading="this.status === 'loading'">
        <router-view></router-view>
    </div>
</template>

<script>
// Vuex
import store from './store'
import { mapGetters } from 'vuex'

// Axios
import axios from 'axios'

// VueRouter
import router from './router'

export default {
    // Application name (default: App)
    name: 'App',
    // Components to be used
    components: {
    },
    computed: mapGetters({
        // Application status variable
        status: 'status'
    }),
    created () {
        // Intercept axios and commit a loading state whenever a new request is made
        axios.interceptors.request.use(
            function (config) {
                if (store.getters.status !== 'loading') {
                    // Commit a loading status to Vuex
                    store.commit('saveStatus', 'loading')
                }
                return config
            }
        )

        // Intercept axios and commit a success or error state whenever a new request succeeded or failed
        axios.interceptors.response.use(
            // Commits a success state
            function (success) {
                // Commits a success status to Vuex
                store.commit('saveStatus', 'success')
                return Promise.resolve(success)
            },
            // Commit an error state
            function (err) {
                // Commits an error status to Vuex
                store.commit('saveStatus', 'error')
                if (err.response) {
                    // If error is 401 (unathourized)
                    if (err.response.status === 401) {
                        // TODO: Redirect to page with unauthorized message
                        // Dispatchs a logout action and redirect back to login component
                        store.dispatch('logout')
                        router.replace({name: 'TheLogin'})
                    }
                }
                return Promise.reject(err)
            }
        )
    }
}
</script>

<style lang="scss" scoped>
// You can either choose to scope the style to this component or not
#main-container {
    background-color: $--background-color-base;
    height: 100%;
}
</style>
