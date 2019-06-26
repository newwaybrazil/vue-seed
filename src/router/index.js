// Vue
import Vue from 'vue'

// VueRouter
import Router from 'vue-router'

// Authorization guard
import AuthGuard from './auth/auth-guard'

// Root components
import TheLogin from '@/components/root/auth/TheLogin'
import TheBoard from '@/components/root/TheBoard'

// Children components
import DashboardContent from '@/components/routes/dashboard/DashboardContent'

import UsersContent from '@/components/routes/users/UsersContent'
import UsersEditContent from '@/components/routes/users/UsersEditContent'

// Using package
Vue.use(Router)

// Exporting VueRouter router
export default new Router({
    routes: [
        {
            // A route should contain a path to be accessed
            path: '/login',
            // It should also contain a string identifier, for further reference
            name: 'TheLogin',
            // And it should loads a component
            component: TheLogin
        },
        {
            path: '/',
            component: TheBoard,
            beforeEnter: AuthGuard,
            children: [
                {
                    path: '',
                    component: DashboardContent,
                    name: 'DashboardContent'
                },
                {
                    path: 'users',
                    component: UsersContent,
                    name: 'UsersContent'
                },
                {
                    path: 'users/edit/:id',
                    component: UsersEditContent,
                    name: 'UsersEditContent'
                },
                {
                    path: 'users/edit/new',
                    component: UsersEditContent,
                    name: 'UsersNewEditContent'
                }
            ]
        }
    ]
})
