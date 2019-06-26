
/*
Profile module
Note that this module defines vuex variables that are related to profile components
*/

// Services to be imported
import users from '@/services/vue-seed/users'

const state = {
    allRoles: {
        'ADMIN': 1000,
        'MANAGER': 1,
        'NORMAL': 0
    },
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('user_id'),
    permissions: localStorage.getItem('permissions')
}

const getters = {
    allRoles (state) {
        return state.allRoles
    },
    username (state) {
        return state.username
    },
    userId (state) {
        return state.userId
    },
    permissions (state) {
        return state.permissions
    },
    profileImage (state) {
        if (state.profileImage === 'undefined') {
            return undefined
        }
        return state.profileImage
    },

    isAdmin (state) {
        return state.permissions >= state.allRoles.ADMIN
    },
    isManagerUser (state) {
        return state.permissions >= state.allRoles.MANAGER
    },
    isNormalUser (state) {
        return state.permissions >= state.allRoles.NORMAL
    }
}

const mutations = {
    saveUsername (state, username) {
        state.username = username
    },
    saveUserId (state, userId) {
        state.userId = userId
    },
    savePermissions (state, permissions) {
        state.permissions = permissions
    },
    saveProfileImage (state, profileImage) {
        state.profileImage = profileImage
    }
}

const actions = {
    async fetchProfileImage ({dispatch}, userId) {
        const res = await users.find({'id': userId})
        const profileImage = res.data.profile_picture
        localStorage.setItem('profile_img', profileImage)
        await dispatch('saveProfileImage', profileImage)
    },

    async setProfileImage ({dispatch}, url) {
        const profileImageURL = url
        localStorage.setItem('profile_img', profileImageURL)
        await dispatch('saveProfileImage', profileImageURL)
    },

    saveUsername ({commit}, username) {
        commit('saveUsername', username)
    },
    saveUserId ({commit}, userId) {
        commit('saveUserId', userId)
    },
    savePermissions ({commit}, permissions) {
        commit('savePermissions', permissions)
    },
    saveProfileImage ({commit}, profileImage) {
        commit('saveProfileImage', profileImage)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
