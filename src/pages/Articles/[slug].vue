<script lang="ts" setup>
import { useAsyncData } from '~/helpers/useAsyncData'
// Ghost keys
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
const route = useRoute()
// const article = ref({})
const article = await useAsyncData(
  'article',
  `${uri}/ghost/api/v3/content/posts/slug/${route.params.slug}/?key=${key}&include=tags,authors`,
  {
    awaitSetup: false,
  },
)
</script>

<template>
  <section>
    <div v-if="article">
      <!-- IMAGE -->
      <article-image
        :feature-image="article.posts[0].feature_image"
      />
      <!-- META -->
      <article-meta
        :article="article.posts[0]"
      />
      <!-- CONTENT -->
      <article-content
        :content="article.posts[0].html"
      />
    </div>
    <div v-else class="loading">
      <FoldingCube />
    </div>
  </section>
</template>

<style>
.loading {
    width: 100%;
    height: 100vh;
}
</style>

<route lang="yaml">
meta:
  layout: article
</route>
