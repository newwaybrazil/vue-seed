<template>
    <el-container direction="vertical" id="board">
        <el-header>
            <span class="header-title">{{ appName }}</span>
            <the-navbar></the-navbar>
            <div class="logout">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        Ações
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <the-logout></the-logout>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside :style="{ width: sidebarSize + 'px'}">
                <the-sidebar></the-sidebar>
            </el-aside>
            <el-aside width="10px">
                <div
                class="resize"
                @click="setSidebarSize()">
                    <span
                    class="resize-icon"
                    :class="[sidebarSize === 0 ? 'collapsed' : null]">
                        <i class="fal fa-fw fa-chevron-left"></i>
                        <i class="fal fa-fw fa-chevron-right"></i>
                    </span>
                </div>
            </el-aside>
            <el-main>
                <the-content :key="$route.path"></the-content>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// Components
import TheNavbar from '@/components/root/board/navbar/TheNavbar'
import TheSidebar from '@/components/root/board/sidebar/TheSidebar'
import TheContent from '@/components/root/board/content/TheContent'
import TheLogout from '@/components/root/auth/TheLogout'

// Vuex
import { mapGetters } from 'vuex'

export default {
    name: 'TheBoard',
    components: {
        TheNavbar,
        TheSidebar,
        TheContent,
        TheLogout
    },
    data () {
        return {
            sidebarSize: 230
        }
    },
    computed: mapGetters({
        appName: 'appName'
    }),
    methods: {
        setSidebarSize () {
            if (this.sidebarSize === 0) {
                this.sidebarSize = 230
            } else {
                this.sidebarSize = 0
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#board {
    height: 100%;
}

.el-header {
    background-color: $--color-primary;
    color: $--color-white;
    display: flex;
    align-items: center;
}

img {
    margin: -0.25rem 0rem 0 0.25rem;
}

.header-title {
    margin: 0 4.75rem 0 0.5rem;
}

.resize {
    border-left: 1px solid transparent;
    height: 100%;
    transition: all 1s;
    &:hover {
        border-left: 1px solid lighten($--color-warning, 25%);
        cursor: pointer;
        .resize-icon {
            transition: all 1s;
            opacity: 1;
        }
    }
    .resize-icon {
        color: $--color-warning;
        position: absolute;
        top: calc(50%);
        opacity: 0;
        transition: all 1s;
    }
}

.collapsed > .fa-chevron-left,
:not(.collapsed) > .fa-chevron-right {
    display: none;
}

.logout {
    cursor: pointer;
    font-size: $--font-size-small;
    margin-left: auto;
    .el-dropdown {
        color: #fff;
    }
}
.header-title{
    font-family: 'Norse';
    font-weight: bolder;
    font-size: xx-large;
}
</style>
