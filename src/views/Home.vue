<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Bill' | localize }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh()">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />
    <div class="row" v-else>
      <HomeBill
      :rates="currency.rates"
      />

      <HomeCurrency
      :rates="currency.rates"
      :date="currency.date" />

    </div>
  </div>
</template>

<script>
import HomeCurrency from '@/components/HomeCurrency.vue'
import HomeBill from '@/components/HomeBill.vue'

export default {
  name: 'home',
  metaInfo () {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  components: { HomeBill, HomeCurrency },
  async mounted() {
   this.currency = await this.$store.dispatch('fetchCurrency')
   this.loading = false
  },
  methods: {
    async  refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>
