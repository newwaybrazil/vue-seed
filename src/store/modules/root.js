/*
Root module
Note that this module defines vuex variables that are related to the whole application
*/

const state = {
    appName: 'vue-seed',
    appVersion: '1.0.0'
}

const getters = {
    appName (state) {
        return state.appName
    },
    appVersion (state) {
        return state.appVersion
    }
}

const mutations = {
}

const actions = {
}

export default {
    state,
    getters,
    mutations,
    actions
}
