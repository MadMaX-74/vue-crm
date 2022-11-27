<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
    <Navbar @click="isOpen = !isOpen" />

    <Sidebar v-model="isOpen"  :key="locale" />

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'
import messages from "@/utils/messages";
import messages from '@/utils/messages'

export default{
  name: 'main-layout',
  components: {Navbar, Sidebar},
  data: () => {
    return {
      isOpen : true,
      loading: true
    }
  },
  async mounted () {
     if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
     }
     this.loading = false
  },
  computed: {
    error( ): any {
      return this.$store.getters.error
    },
    locale () :string {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>

<style scoped>
</style>
