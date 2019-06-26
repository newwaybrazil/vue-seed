<template>
    <div class="sidebar">
        <ul>
            <router-link
            class="el-menu-item"
            :class="{ 'is-active': isCurrentRoute(item) }"
            tag="li"
            v-for="item in sidebarItems[activeObject]"
            :key="item.id"
            :to="item.route">
                <i :class="[item.icon, 'fa-fw']"></i>
                <span>
                    {{ item.title }}
                </span>
            </router-link>
        </ul>
    </div>
</template>

<script>
// Configuration object for sidebar items
import { sidebarItems } from '@/config/sidebar'

export default {
    name: 'TheSidebar',
    data () {
        return {
            activeObject: '',
            sidebarItems: sidebarItems
        }
    },
    mounted () {
        this.activeObject = this.$route.path.split('/')[1]
    },
    watch: {
        $route (newVal, oldVal) {
            this.activeObject = newVal.path.split('/')[1]
            this.$forceUpdate()
        }
    },
    methods: {
        isCurrentRoute (item) {
            if (this.$route.path === item.route) {
                return true
            }
            return false
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    background-color: white;
    border-right: 1px solid #e6e6e6;
    height: 100%;
    .sidebar-menu {
        font-size: $--font-size-large;
        padding: 20px 20px 10px 20px;
    }
}

ul {
    margin: 0;
    padding: 0;
}

.el-menu-item {
    &:hover {
        background-color: darken(#356fe2, 10%);
    }
    background-color: #356fe2;
    color: white;
}

.is-active {
    color: white;
    background-color: darken(#356fe2, 10%);
}
</style>
