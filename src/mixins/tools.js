export const tools = {
    // Wrapps a significant amount of tools into local methods
    methods: {
        // Format num as percentage: .367 = 36.7%
        formatAsPercentage (n) {
            if (!n) {
                n = 0
            }
            return parseFloat(Math.round(n * 100)).toFixed(1) + '%'
        },

        // Returns the default page size
        pageSizeDefault () {
            return 10
        },

        // Options for how many records a table page can hold
        pageSizeOptions () {
            return [
                {
                    value: 5,
                    text: '5'
                },
                {
                    value: 10,
                    text: '10'
                },
                {
                    value: 25,
                    text: '25'
                },
                {
                    value: 50,
                    text: '50'
                }
            ]
        },

        // Parses sortBy + sortDesc into mongo-odm compatible query
        parseSort (query) {
            let sortQuery = {}
            if (query.sortBy) {
                if (query.sortDesc) {
                    sortQuery.sort_desc = query.sortBy
                } else {
                    sortQuery.sort_asc = query.sortBy
                }
            }
            return sortQuery
        }
    }
}
