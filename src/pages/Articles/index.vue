<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
useHead({
  title: 'Articles',
})
const latestArticles = computed(() => useGhost.listLatestArticles)
</script>

<template>
  <section>
    <div v-if="latestArticles">
      <articles-latest
        :articles="latestArticles"
      />
    </div>
  </section>
</template>
