<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'History' | localize }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'доход' : 'расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income'
          }">
            <div class="card-content white-text">
              <p>{{'Description' | localize }}: {{ record.description }}</p>
              <p>{{ 'Sum' | localize }}: {{record.amount | currency}}</p>
              <p>{{ 'Category' | localize }}: {{record.categoryName}}</p>

              <small>{{ record.date |date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{ 'no_record' | localize }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: 'detail',
  metaInfo () {
    return {
      title: this.$title('Record')
    }
  },
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    const id = this.$route.params.id
    const record :any = await this.$store.dispatch('fetchRecordById', id)
    const category :any = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  }
})

</script>
