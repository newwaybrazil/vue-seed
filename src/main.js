// Vue main application related
import Vue from 'vue'
import App from './App'

// Vue Router main file
import router from './router'

// Vuex main file
import store from './store'

// External packages and assets
import './packages'

// Set if environment is production-ready or not
Vue.config.productionTip = false

/* eslint-disable no-new */

// Define a new Vue application
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
