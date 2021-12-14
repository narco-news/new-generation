<script setup lang="ts">
// import { onBeforeMount } from 'vue'
import { useHead } from '@vueuse/head'
import TheNav from './components/TheNav.vue'
// import { useGhostStore } from './stores/ghost'
// const ghost = useGhostStore()
// onBeforeMount(() => ghost.getPosts())
useHead({
  meta: [
    { name: 'og:site_name', content: 'Vite SSR Example Project ' },
    { name: 'description', content: 'Vite SSR Example Project' },
  ],
})
</script>

<template>
  <TheNav />
  <div>
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </RouterView>
  </div>
  <TheFooter />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
