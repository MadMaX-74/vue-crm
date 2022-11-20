<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill |currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>

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

<script lang="ts">
import Vue from "vue";
import {mapGetters} from "vuex";
import currencyFilter from "@/filters/currency.filter";

export default Vue.extend({
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategory')

    this.categories = categories.map((item :any) => {
      const spend = records
          .filter((r :any) => r.categoryId === item.id)
          .filter((r :any) => r.type === 'outcome')
          .reduce((total :number, record :any) => {
            return total +=  +record.amount
          }, 0)
      const percent :number = 100 * spend / item.limit
      const progressPercent :number = percent > 100 ? 100 : percent
      const progressColor :string = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue :number = item.limit - spend
      const tooltip :any = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
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
})
</script>
