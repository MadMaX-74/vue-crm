<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <PieChart :pieLable="categories" :pieData="categoriesData"/>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">Записей пока нет <router-link to="/record">Добавьте запись</router-link></p>

    <section>
      <HistoryTable :records="items"/>

      <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"/>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HistoryTable from "@/components/HistoryTable.vue";
import paginationMixin from "@/mixins/pagination.mixin.js";
import PieChart from "@/components/app/Pie.vue";

export default Vue.extend({
  name: 'history',
  mixins: [paginationMixin],
  components: {PieChart, HistoryTable},
  data: () => ({
    loading: true,
    records : [],
    categories: [],
    categoriesData: []
  }),
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategory')
    this.setup(categories)
    this.categories = categories.map(c => c.title)
    this.categoriesData = categories.map(c => {
      return this.records.reduce((total, r) => {
        if (r.categoryId === c.id && r.type === 'outcome'){
          total += +r.amount
        }
        return total
      }, 0)
    })

    this.loading = false
  },
  methods: {
    setup (categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))
    }
  }
})
</script>
