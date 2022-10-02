<template>
    <div class="grey darken-1 empty-layout">
        <router-view />
    </div>
</template>

<script lang="ts">
import messages from '@/utils/messages'
export default {
    computed: {
        error(): any {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            this.$error(messages[fbError.code] || 'Что-то пошло не так')
        }
    }
}
</script>

<style lang="scss">

</style>