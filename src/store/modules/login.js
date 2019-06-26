/*
Login module
Note that this module defines vuex variables that are related to the system login
*/

// Packages to be imported
import axios from 'axios'

// Services to be imported
import login from '@/services/vue-seed/login'

const state = {
    status: '',
    token: localStorage.getItem('token')
}

const getters = {
    status (state) {
        return state.status
    },
    token (state) {
        return state.token
    },
    isAuthenticated (state) {
        return !!state.token
    }
}

const mutations = {
    saveStatus (state, status) {
        state.status = status
    },
    saveToken (state, token) {
        state.token = token
    }
}

const actions = {
    async login ({dispatch}, params) {
        const res = await login.login(params)

        const token = res.data.token

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

        localStorage.setItem('token', token)

        await dispatch('saveToken', token)
    },

    async logout ({dispatch}) {
        delete axios.defaults.headers.common['Authorization']

        localStorage.removeItem('token')

        await dispatch('saveToken', null)
    },

    saveStatus ({commit}, status) {
        commit('saveStatus', status)
    },
    saveToken ({commit}, token) {
        commit('saveToken', token)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
