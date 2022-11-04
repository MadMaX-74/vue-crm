<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>

            <p 
            v-for="cur of currencies"
            :key="cur"
            class="currency-line">
              <span>{{getCurrency(cur) | currency(cur)}}</span>
            </p>
          </div>
        </div>
      </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            rates: {
                type: Object
            }
        },
        data: () => ({
            currencies: ['RUB', 'USD', 'EUR']
        }),
        computed: {
            base() :number{
                return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['USD'])
            }
        },
        methods: {
            getCurrency(currency :string) :number {
                return Math.floor(this.base * this.rates[currency])
            }
        }
    })
</script>

<style scoped>

</style>