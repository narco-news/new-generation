<script setup lang="ts">
// Imports
import { PostsOrPages } from '@tryghost/content-api'
// Define props
const props = defineProps<{
  authorArticles: PostsOrPages
}>()
// Define authorArticles
const authorArticles = ref(props.authorArticles)
</script>
<template>
  <div v-for="article in authorArticles" :key="article.slug">
    {{ article.title }}
  </div>
</template>
