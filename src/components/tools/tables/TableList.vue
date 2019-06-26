<template>
    <div>
        <el-table
        :data="data.data"
        style="width: 100%">
            <el-table-column
            v-for="(c, idx) in columns"
            :key="idx"
            :prop="c.key"
            :label="c.label"
            sortable>
            </el-table-column>
            <el-table-column
            align="center"
            label="Ações">
                <template slot-scope="scope">

                    <el-button v-for="i in extraRowButtons" v-bind:key="i.name"
                    v-bind:size="i.size"
                    v-bind:type="i.type"
                    @click="i.action(scope.row)">
                        <i class="fas " v-bind:class="i.iconClass"></i>
                        {{i.name}}
                    </el-button>
                    <el-button
                    size="small"
                    type="info"
                    @click="doEditRow(scope.row)">
                        <i class="fas fa-fw fa-edit"></i>
                        Editar
                    </el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="removeRow(scope.row)">
                        <i class="fas fa-fw fa-trash-alt"></i>
                        Remover
                    </el-button>
                </template>
            </el-table-column>
            <template slot="actions">
                Nenhum resultado disponível.
            </template>
            <template slot="empty">
                Nenhum resultado disponível.
            </template>
        </el-table>
        <el-row class="mt-4">
            <el-pagination
            background
            @size-change="onPageSizeChange"
            @current-change="onPageChange"
            :page-sizes="[5, 10, 25, 50]"
            :page-size="data.size"
            layout="sizes, prev, pager, next"
            :total="data.totalElements">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
// Mixins
import { tools } from '@/mixins/tools'

export default {
    name: 'TableList',
    props: {
        'onNavigate': {
            type: Function,
            required: true
        },
        'columns': {
            type: Array,
            required: true
        },
        'data': {
            type: Object,
            required: true
        },
        'removeRow': {
            type: Function,
            required: false
        },
        'editRow': {
            type: Function,
            required: false
        },
        'extraRowButtons': {
            type: Array,
            required: false
        }
    },
    mixins: [tools],
    data () {
        return {
            // A query object
            query: {
                // Table's current page
                page: null,
                // Default table page size
                size: null
            },
            // All the page size options
            perPageOptions: this.pageSizeOptions()
        }
    },
    beforeMount () {
        // Checks for input debounce, in order to not perform pre-processing at all times
        this.debounceInput = this.$lodash.debounce(function (e) {
            this.onFilterInput()
        }.bind(this), 500)
    },
    methods: {
        // Checks if an extra row button is valid
        rowButtonValid (rowButton) {
            let requiredKeys = ['title', 'click', 'icon']
            requiredKeys.map(function (k) {
                if (!rowButton[k]) {
                    console.error('Missing key in rowButton:', k)
                    return false
                }
            })
            return true
        },

        // This will call an edit component for selected row
        doEditRow (data) {
            if (this.editRow) {
                return this.editRow(data)
            } else {
                return this.changeRoute(data)
            }
        },

        // Change route based on data's ID
        changeRoute (data) {
            let id = ''
            if (data._id) {
                id = data._id
            }
            if (data.id) {
                id = data.id
            }
            this.$router.push({ path: `${this.$route.path}/${id}` })
        },

        // Table sorting changed
        onSort (ctx) {
            let query = this.$lodash.merge(this.query, {
                page: 0,
                sortBy: ctx.sortBy,
                sortDesc: ctx.sortDesc
            })
            this.onNavigate(query)
        },

        // Filter input was changed
        onFilterInput () {
            let query = this.$lodash.merge(this.query, {page: 0, filter: this.query.filter})
            this.onNavigate(query)
        },

        // Page was changed (through paginator)
        onPageChange (page) {
            let query = this.$lodash.merge(this.query, {page: page})
            this.onNavigate(query)
        },

        // "Items per Page" was changed
        onPageSizeChange (pageSize) {
            let query = this.$lodash.merge(this.query, {page: 0, pageSize: pageSize})
            this.onNavigate(query)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
