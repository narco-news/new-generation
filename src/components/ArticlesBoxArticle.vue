<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
import { useTimeoutFn } from '@vueuse/core'
const props = defineProps<{
  title: string
  date: string
  author: string
  excerpt: string
  readingTime: string
  featureImage: string
}>()
const isLoaded = ref(true)
const hiddenImage = ref(false)
const loaded = () => {
  useTimeoutFn(() => {
    isLoaded.value = false
    hiddenImage.value = true
  }, 200)
  // isLoaded.value = false
  // hiddenImage.value = true
}
</script>
<template>
  <content-loader
    v-show="isLoaded"
    :speed="1"
    primary-color="#f3f3f3"
    secondary-color="#ecebeb"
  >
    <rect
      x="0"
      y="0"
      rx="0"
      ry="0"
      width="400"
      height="200"
    />
  </content-loader>
  <img
    v-show="hiddenImage"
    :src="props.featureImage"
    :alt="props.title"
    class="article-image"
    @load="loaded"
  >
  <h1>{{ props.title }}</h1>
</template>
<style lang="postcss" scoped>
.article-image {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
</style>
