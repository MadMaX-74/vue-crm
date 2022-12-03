<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">{{ 'Exchange_Rates' | localize }}</span>
            </div>
            <table>
              <thead>
              <tr>
                <th>{{ 'Currency' | localize }}</th>
                <th>{{ 'Exchange' | localize }}</th>
                <th>{{ 'Date' | localize }}</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="cur in currencies" :key="cur">
                <td>{{cur}}</td>
                <td>{{rates[cur].toFixed(3 )}}</td>
                <td>{{date | date('date')}}</td>
              </tr>
              </tbody>
            </table>
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
            },
            date: {
                type: String
            }
        },
        data: () => ({
            currencies: ['RUB', 'USD', 'EUR']
        })

    })
</script>

<style scoped>

</style>
