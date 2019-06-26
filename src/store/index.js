/* Vuex store
This is the main vuex file, containing all the packages to be imported and its sub-modules
*/

// Vue main application
import Vue from 'vue'

// Vuex package
import Vuex from 'vuex'

// Vuex modules to be imported
import root from './modules/root'
import login from './modules/login'
import profile from './modules/profile'

// Vuex packages to be used
Vue.use(Vuex)

// Check if environment is production-ready or not
const debug = process.env.NODE_ENV !== 'production'

// Exporting main Vuex store and its modules to whole application
export default new Vuex.Store({
    // Note that a module is constructed by 4 main structures:
    // - state: basic variables that operates Vuex
    // - getters: functions to return states
    // - mutations: if you ever net to set a new value to a state
    // - actions: you can also perform async operations, wrapping mutations into commit and dispacthing them
    modules: {
        root,
        profile,
        login
    },
    strict: debug
})
