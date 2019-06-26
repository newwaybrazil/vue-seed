/*
Note that this service defines all functions related to vue_seed's users controller
*/

import vue_seed from '@/services/vue-seed'

export default {
    // Gets all users
    list (params) {
        return vue_seed().get('/v1/user?', {params})
    },
    // Gets an user by its ID
    find (params) {
        return vue_seed().get(`/v1/user/${params.id}`)
    },
    // Gets a user by its Name
    findByName (params) {
        return vue_seed().get(`/v1/user/${params.name}`)
    },
    // Creates a new user
    create (data) {
        return vue_seed().post('/v1/user', data)
    },
    // Updates an existing user's password
    updatePassword (params, data) {
        return vue_seed().patch(`/v1/user/${params.id}`, data)
    },
    // Updates an existing user's profile image
    updateProfileImage (params, data) {
        return vue_seed().put(`/v1/user/${params.id}`, data)
    },
    // Deletes an existing user
    delete (params) {
        return vue_seed().delete(`/v1/user/${params.id}`)
    }
}
