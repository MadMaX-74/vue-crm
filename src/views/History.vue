<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Records_History' | localize }}</h3>
    </div>

    <div class="history-chart">
      <PieChart :pieLable="categoriesLabel" :pieData="categoriesData" :key="categoriesLabel.length"/>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">{{ 'No_Entries' | localize }} <router-link to="/record">{{ 'Add_Record' | localize }}</router-link></p>

    <section>
      <HistoryTable :records="items"/>

      <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Back'"
          :next-text="'Forward'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"/>
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";
import paginationMixin from "@/mixins/pagination.mixin.js";
import PieChart from "@/components/app/Pie.vue";

export default{
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  mixins: [paginationMixin],
  components: {PieChart, HistoryTable},
  data: () => ({
    loading: true,
    records : [],
    categoriesLabel: [],
    categoriesData: []
  }),
  async mounted () {
    try {
      this.records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategory')
      this.setup(categories)

      this.categoriesLabel = categories.map(c => c.title)
      this.categoriesData = categories.map(c => {
        return this.records.reduce((total, r) => {
          if (r.categoryId === c.id && r.type === 'outcome'){
            total += +r.amount
          }
          return total
        }, 0)
      })
      this.loading = false

    } catch (e) {
      this.loading = false
      console.warn(e.message)
    }
  },
  methods: {
    setup (data) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: data.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))
    }
  }
}
</script>
