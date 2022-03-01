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
const titleTextColor = ref()
const CSS_imageBorderColor = ref()
const CSS_articleAuthorColor = ref()
// Hover watcher
const stopWatcher = watchEffect(() => {
  if (isHovered.value === true) {
    // Hover styles
    CSS_imageFilter.value = 'saturate(100%) grayscale(0%)'
    CSS_titleTextDecoration.value = 'underline'
    titleTextColor.value = 'var(--slate-700)'
    CSS_imageBorderColor.value = 'var(--green-300)'
    CSS_articleAuthorColor.value = 'var(--green)'
  }
  else {
    // Default styles
    CSS_imageFilter.value = 'saturate(50%) grayscale(60%)'
    CSS_titleTextDecoration.value = 'none'
    titleTextColor.value = 'var(--green)'
    CSS_imageBorderColor.value = 'var(--green-400)'
    CSS_articleAuthorColor.value = 'var(--slate-700)'
  }
})
tryOnBeforeUnmount(() => stopWatcher())
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <div ref="articleLink">
    <router-link
      :to="`/articles/${props.article.slug}`"
      :title="props.article.title"
      class="featured-article__wrapper"
    >
      <div
        v-if="isLargeScreen"
        class="featured-article__image-wrapper"
        style="margin-bottom: 2rem;"
      >
        <img
          :src="props.article.feature_image"
          :alt="props.article.title"
          class="featured-article__image"
        >
      </div>
      <h1 class="featured-article__title">
        {{ props.article.title }}
      </h1>
      <p class="featured-article__author">
        {{ props.article.primary_author.name }}
        <span class="dash">
          –
        </span>
        <time>
          {{ formatDate(String(props.article.published_at), 'MMMM DD, YYYY') }}
        </time>
      </p>
      <div class="featured-article__excerpt">
        {{ props.article.custom_excerpt }}
      </div>
      <div
        v-if="!isLargeScreen"
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
  </div>
</template>

<style lang="postcss" scoped>
.featured-article__wrapper {
  display: block;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  margin: 0 0.5rem;
  @media (max-width: 768px) {
    border-bottom: 1px solid var(--slate-400);
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
  /*  */
  .featured-article__image-wrapper {
    overflow: hidden;
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;
    box-sizing: content-box;
    height: 170px;
    box-shadow:
      1px 2px 2px hsla(161, 76%, 37%, 0.2),
      2px 4px 4px hsla(161, 76%, 37%, 0.2),
      4px 8px 8px hsla(161, 76%, 37%, 0.2),
      8px 16px 16px hsla(161, 76%, 37%, 0.2),
      16px 32px 32px hsla(161, 76%, 37%, 0.2), 0 0 0 1px var(--green-400);
    border-radius: 2px;
    transition: all 180ms ease-in;
    @media (min-height: 640px) {
      height: 300px;
      box-shadow:
        1px 2px 2px hsla(161, 76%, 37%, 0.333),
        2px 4px 4px hsla(161, 76%, 37%, 0.333),
        3px 6px 6px hsla(161, 76%, 37%, 0.333), 0 0 0 2px v-bind(CSS_imageBorderColor);
      }
    .featured-article__image {
      object-fit: cover;
      aspect-ratio: 16/9;
      width: 100%;
      height: 100%;
      filter: v-bind(CSS_imageFilter);
      border-radius: 2px;
      transition: all 180ms ease-in;
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
    color: v-bind(titleTextColor);
    margin: 0 1rem;
    padding: 0;
    text-decoration: 2px solid v-bind(CSS_titleTextDecoration) v-bind(titleTextColor);
    font-size: clamp(100%, 1.8rem + 2vw, 42px);
    letter-spacing: 1px;
    transition: all 180ms ease-in;
  }
  .featured-article__author {
    color: v-bind(CSS_articleAuthorColor);
    margin: 1rem;
    padding: 0;
    font-weight: 500;
    font-size: 13px;
    font-family: monospace;
    transition: all 180ms ease-in;
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
    font-size: clamp(100%, 0.7rem + 2vw, 16px);
    font-weight: 400;
    line-height: 1.5;
  }
}

html.dark {
  .featured-article__wrapper {
    border-bottom-color: var(--slate-500);
  }
  .featured-article__excerpt {
    color: var(--slate-400);
  }
  .featured-article__author {
    color: var(--slate-300);
  }
  .featured-article__title {
    text-decoration-color: var(--slate-400);
  }
}
</style>
