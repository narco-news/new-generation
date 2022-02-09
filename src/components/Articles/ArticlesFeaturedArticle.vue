<script setup lang="ts">
import { PostOrPage } from '@tryghost/content-api'
import formatDate from '~/composables/formatDate'
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
    CSS_imageFilter.value = 'brightness(0.80) saturate(0.80)'
    CSS_titleTextDecoration.value = 'none'
  }
})
tryOnBeforeUnmount(() => stopWatcher())
</script>

<template>
  <router-link
    :to="`/articles/${props.article.slug}`"
    :title="props.article.title"
    class="featured-article__wrapper"
  >
    <h1 class="featured-article__title">
      {{ props.article.title }}
    </h1>
    <p class="featured-article__author">
      {{ props.article.primary_author.name }}
      <span class="dash">
        –
      </span>
      <time>
        {{ formatDate(String(props.article.published_at), 'MMM. DD') }}
      </time>
    </p>
    <div class="featured-article__excerpt">
      {{ props.article.custom_excerpt }}
    </div>
    <div
      class="featured-article__image-wrapper"
      style="margin-bottom: 2rem;"
    >
      <img
        :src="props.article.feature_image"
        :alt="props.article.title"
        class="featured-article__image"
      >
    </div>
  </router-link>
</template>

<style lang="postcss" scoped>
.featured-article__wrapper {
  display: block;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  border-bottom: 1px solid var(--slate-400);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  margin: 0 0.5rem;
  /*  */
  .featured-article__image-wrapper {
    overflow: hidden;
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;
    box-sizing: content-box;
    height: 170px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px, 0 0 0 2px var(--green);
    @media (min-height: 640px) {
      height: 180px;
    }
    .featured-article__image {
      object-fit: cover;
      aspect-ratio: 16/9;
      width: 100%;
      height: 100%;
      filter: v-bind(CSS_imageFilter);
    }
    .featured-article__image-meta {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0.5rem;
      background-color: rgba(255, 255, 255, 0.719);
      backdrop-filter: blur(2px);
      width: 100%;
    }
  }
  .featured-article__title {
    color: var(--green);
    margin: 0 1rem;
    padding: 0;
    text-decoration: 2px dotted underline var(--slate-700);
    font-size: clamp(100%, 1.5rem + 2vw, 32px);
    letter-spacing: 1px;
  }
  .featured-article__author {
    color: var(--slate-700);
    margin: 1rem;
    padding: 0;
    font-weight: 500;
    font-size: 16px;
    em {
      font-weight: 400;
    }
    .dash {
      font-weight: 400;
      padding: 0 0.2rem;
    }
    time {
      font-weight: 400;
    }
  }
  .featured-article__excerpt {
    color: var(--slate-600);
    margin: 1rem;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.7;
  }
}

html.dark {
  .featured-article__wrapper {
    border-bottom-color: var(--slate-500);
  }
  .featured-article__excerpt {
    color: var(--slate-500);
  }
  .featured-article__author {
    color: var(--slate-400);
  }
  .featured-article__title {
    text-decoration-color: var(--slate-400);
  }
}
</style>
