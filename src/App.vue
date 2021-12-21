<script setup lang="ts">
import { inject } from 'vue'
import { useGhostStore } from '~/stores/ghost'
const ghostStore = useGhostStore()
const initialState: any = inject('initialState')
onMounted(() => {
  ghostStore.allArticles = initialState.pinia.articles
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </RouterView>
</template>
