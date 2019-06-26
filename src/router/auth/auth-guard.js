// Vuex main storage file
import store from '@/store'

export default (to, from, next) => {
    // Check if user is authenticated based on Vuex login's module actions
    if (!store.getters.isAuthenticated) {
        // If not authenticated, proceed to login route
        next('/login')
    } else {
        // If authenticated, may pass to a guarded component
        next()
    }
}
