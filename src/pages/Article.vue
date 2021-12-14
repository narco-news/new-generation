<script setup lang="ts">
import { computed, onBeforeMount, onUnmounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useGhostStore } from '../stores/ghost'
const route = useRoute()
const ghost = useGhostStore()
const article = computed(() => ghost.listPost)
useHead({
  title: computed(() => ghost.listPost.title),
  meta: [
    {
      name: 'description',
      content: '',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:creator',
      content: '@elparece',
    },
    {
      name: 'twitter:creator',
      content: '@just_some_d00d',
    },
    {
      name: 'og:url',
      content: '',
    },
    {
      name: 'og:title',
      content: '',
    },
    {
      name: 'og:description',
      content: '',
    },
    {
      name: 'og:image',
      content: '',
    },
  ],
})
// const articleSlug = route.params.slug
// ghost.getPost(articleSlug)
// Prefetch server call
// onServerPrefetch(() => {
//     return ghost.getPost(articleSlug)
// })
onBeforeMount(() => {
  ghost.getPost(route.params.slug)
})
onUnmounted(() => {
  ghost.currentPost = {}
})

</script>
<template>
  <h1>{{ article.title }}</h1>
  <img :src="article.feature_image" :alt="article.title">
  <div class="article__content" v-html="article.html" />
</template>

<style lang="postcss" scoped>
.article__content {
    max-width: 65ch;
    margin: 0 auto;
    ::v-deep(img) {
        max-width: 600px;
        height: 100%;
        object-fit: cover;
        margin: 1em 0;
    }
    ::v-deep(p) {
        margin: 2em 0;
        line-height: 1.5;
        font-size: large;
        font-family: serif;
    }
}
img {
    max-height: 600px;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
}
</style>
