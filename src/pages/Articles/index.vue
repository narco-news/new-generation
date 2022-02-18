<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const latestArticles = computed(() => useGhost.listLatestArticles)
useHead({
  title: 'Articles',
})
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
