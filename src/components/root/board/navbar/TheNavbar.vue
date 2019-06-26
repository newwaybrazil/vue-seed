<template>
    <el-menu
    mode="horizontal"
    text-color="#ffffff"
    :default-active=activeRoute
    :router="true">
        <el-menu-item
        v-for="item in navbarItems"
        :key="item.id"
        :index=item.route
        :route=item.route>
            {{ item.title }}
        </el-menu-item>
    </el-menu>
</template>

<script>
// Configuration object for navbar items
import { navbarItems } from '@/config/navbar'

export default {
    name: 'TheNavbar',
    data () {
        return {
            activeRoute: '',
            navbarItems: navbarItems
        }
    },
    mounted () {
        this.activeRoute = this.$route.path.split('/')[1]
        this.activeRoute = '/' + this.activeRoute
    },
    watch: {
        $route (newVal, oldVal) {
            this.activeRoute = newVal.path.split('/')[1]
            this.activeRoute = '/' + this.activeRoute
        }
    }
}
</script>

<style lang="scss" scoped>
.el-menu.el-menu--horizontal {
    border-bottom: none;
    .el-menu-item {
        border-bottom: none;
        background-color: $--color-primary;
    }
    .is-active {
        background-color: darken($--color-primary, 15%) !important;
        color: white;
    }
}
</style>
