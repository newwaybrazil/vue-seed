/*
Login service
Note that this service defines all functions related to vue-seed's login controller
*/

import vue_seed from '@/services/vue-seed'

export default {
    // Logs an user on vue-seed
    login (data) {
        return vue_seed().post('/login', data)
    }
}
