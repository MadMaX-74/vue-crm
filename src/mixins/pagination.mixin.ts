import Vue from "vue";
import _ from 'lodash';

export default Vue.extend({
    data () {
        return {
            page: +this.$route.query.page || 1,
            pageSize: 3,
            pageCount: 0,
            allItems: [],
            items: []
        }
    },
    methods: {
        setupPagination (allItems :Array<any>) :void{
            this.allItems = _.chunk(allItems,  this.pageSize)
            this.pageCount = _.size(this.allItems)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
        },
        pageChangeHandler(page :number) :void {
            this.$router .push(`${this.$route.path}?page=${page}`)
            this.items = this.allItems[page - 1] || this.allItems[0 ]
        }
    }
})
