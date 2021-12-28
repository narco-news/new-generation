<script setup lang="ts">
// Imports
import { PostOrPage } from '@tryghost/content-api'
import { useAsyncData } from '~/helpers/useAsyncData'
import { useGhostStore } from '~/stores/ghost'
// Use Route
const route = useRoute()
//
// Declare ghost store
const useGhost = useGhostStore()
//
// Import Ghost creds
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
// Make call to get article
const article = await useAsyncData<PostOrPage>(
  'article',
  `${uri}/ghost/api/v3/content/posts/slug/${route.params.slug}/?key=${key}&include=authors,tags`,
)
const showBottomBox = ref(false)
function isTitleVisible(value) {
  showBottomBox.value = value
}
// onBeforeUnmount(() => article.value = undefined)
</script>

<template>
  <article v-if="article" class="article">
    <!-- <article-nav /> -->
    <article-image
      :feature-image="article.posts[0].feature_image"
      :title="article.posts[0].title"
    />
    <article-meta
      :title="article.posts[0].title"
      :tags="article.posts[0].tags"
      :primary-author="article.posts[0].primary_author"
      :published-at="article.posts[0].published_at"
      :reading-time="article.posts[0].reading_time"
      @title-visible="isTitleVisible($event)"
    />
    <article-content :content="article.posts[0].html" />
    <!-- <article-scroll-progress /> -->
    <transition name="slide" mode="in-out">
      <article-bottom-bar
        v-show="!showBottomBox"
        :title="article.posts[0].title"
        :primary-author="article.posts[0].primary_author"
      />
    </transition>
    <!--Article  -->
  </article>
</template>

<style lang="postcss" scoped>
.article {
  /* border: 2px dashed blue; */
  /*  */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  height: auto;
}
/*
  Credit to Máximo Mussini for transition
  https://github.com/ElMassimo/iles/blob/main/docs/src/components/DarkModeSwitch.vue
   */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.15s ease-out;
}
.slide-enter-from {
  transform: translateY(100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
.slide-leave-to {
  transform: translateY(100%);
  opacity: 100;
}
</style>

<route lang="yaml">
meta:
  layout: article
</route>
