<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Planning' | localize }}</h3>
      <h4>{{info.bill |currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">{{ 'no_categories' | localize }} <router-link to="/categories">
      {{ 'Add_Category' | localize }}</router-link></p>

    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currency}} из {{ category.limit |currency}}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
              class="determinate"
              :class="[category.progressColor]"
              :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import currencyFilter from "@/filters/currency.filter";

export default{
  name: 'planning',
  metaInfo () {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategory')

    this.categories = categories.map((item) => {
      const spend = records
          .filter((r) => r.categoryId === item.id)
          .filter((r) => r.type === 'outcome')
          .reduce((total, record) => {
            return total +=  +record.amount
          }, 0)
      const percent = 100 * spend / item.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = item.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...item,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>
