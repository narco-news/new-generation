<script setup lang="ts">
import { PostOrPage } from '@tryghost/content-api'
const props = defineProps<{
  article: PostOrPage
}>()
const articleLink = ref()
const isHovered = useElementHover(articleLink)
// CSS values
const CSS_imageFilter = ref()
const CSS_titleTextDecoration = ref()
// Hover watcher
const stopWatcher = watchEffect(() => {
  if (isHovered.value === true) {
    // Hover styles
    CSS_imageFilter.value = 'brightness(0.90) saturate(1)'
    CSS_titleTextDecoration.value = 'underline'
  }
  else {
    // Default styles
    CSS_imageFilter.value = 'brightness(0.50) saturate(0.75)'
    CSS_titleTextDecoration.value = 'none'
  }
})
tryOnBeforeUnmount(() => stopWatcher())
</script>

<template>
  <router-link
    :to="`/articles/${props.article.slug}`"
    :title="props.article.title"
    class="article-featured"
  >
    <div ref="articleLink">
      <div class="article-featured__meta">
        <h1 class="article-featured__title">
          {{ props.article.title }}
        </h1>
      </div>
      <div class="article-featured__image-wrapper">
        <img
          :src="String(props.article.feature_image)"
          :alt="props.article.title"
          class="article-featured__image"
          loading="lazy"
        >
      </div>
    </div>
  </router-link>
</template>

<style lang="postcss" scoped>
.article-featured {
  /*  */
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  height: 100%;
  min-height: 165px;
  border-radius: 8px;
  border: 2px solid var(--slate-100);
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;

  @media (max-width: 425px) {
    height: 120px;
  }
  & .article-featured__meta {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    z-index: 100;

    & .article-featured__author {
      margin: 0;
      padding: 0;
      font-family: "Oswald";
      font-weight: 400;
      color: white;
    }
    & .article-featured__title {
      margin: 0;
      padding: 0;
      color: white;
      font-size: clamp(100%, 1rem + 2vw, 32px);
      text-decoration: v-bind('CSS_titleTextDecoration');
      text-decoration-color: var(--green);
    }
  }

  .article-featured__image-wrapper {
    overflow: hidden;
    border-radius: 8xp;
    & .article-featured__image {
      position: absolute;
      object-fit: cover;
      width: 100%;
      height: 100%;
      z-index: 10;
      filter: v-bind('CSS_imageFilter');
      border-radius: 8px;
    }
  }
}

html.dark {
  .article-featured {
    border-color: var(--slate-300);
  }
}
</style>
