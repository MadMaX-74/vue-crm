<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit v-if="categories.length" :categories="categories" @updated="updateCategories" :key="categories.length + updateCount" />
        <p v-else class="center">{{"no_categories" | localize }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import Loader from '@/components/app/Loader.vue';

export default{
  name: 'categories',
  metaInfo () {
    return {
      title: this.$title('Categories')
    }
  },
  components: {CategoryCreate, CategoryEdit, Loader},
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategory');
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount ++
    }
  }
}
</script>
