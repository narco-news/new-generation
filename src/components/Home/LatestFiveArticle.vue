<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Article } from '~/ghostTypes'
dayjs.extend(relativeTime)
const props = defineProps<{
  article: Article
}>()
const latestFiveArticle = ref()
const articleHovered = useElementHover(latestFiveArticle)
const imageLoaded = ref(false)
// CSS values
const CSS_imageFilter = ref()
// Hover watcher
const stopWatcher = watchEffect(() => {
  if (articleHovered.value === true) {
    // Hover styles
    CSS_imageFilter.value = 'brightness(0.80) saturate(1) blur(0)'
  }
  else {
    // Default styles
    CSS_imageFilter.value = 'brightness(0.40) saturate(0.90) blur(3px)'
  }
})
tryOnBeforeUnmount(() => stopWatcher())
</script>

<template>
  <div ref="latestFiveArticle" class="lf-article">
    <router-link :to="`/articles/${props.article.slug}`">
      <div class="lf-article__image-wrapper">
        <img
          v-show="imageLoaded"
          :src="props.article.feature_image"
          :alt="props.article.title"
          :title="props.article.title"
          class="lf-article__image"
          @load="imageLoaded = true"
        >
      </div>
      <div v-show="imageLoaded" class="lf-article__meta">
        <h1 class="lf-article__title">
          {{ props.article.title }}
        </h1>
        <h2 class="lf-article__author">
          {{ props.article.primary_author?.name }}
        </h2>
      </div>
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
.lf-article {
  height: 100%;
  min-height: 170px;
  display: block;
  border-radius: 8px;
  box-shadow: 0 0 0 1px var(--slate-300);
  transition: border 180ms ease-in;
  transition: box-shadow 180ms ease-in;
  position: relative;
  overflow: hidden;
  z-index: 20;
  a {
    text-decoration: none;
    color: var(--slate-200);
  }
  &:hover {
    box-shadow: 0 0 0 2px var(--green);
    border-color: var(--green);
  }
  .lf-article__image-wrapper {
    height: 100%;
    &::before {
      content: "narco.news";
      font-size: 16px;
      color: var(--slate-300);
      animation: blink 3s linear infinite;
      position: absolute;
      width: 100%;
      height: 100%;
      display: grid;
      place-content: center;
      z-index: -10;
    }
    .lf-article__image {
      filter: v-bind("CSS_imageFilter");
      transition: filter 180ms ease-in;
      transition: transform 0.3s ease;
      z-index: 10;
      transform: scale(1);
      object-fit: cover;
      object-position: center;
      aspect-ratio: 1/1;
      width: 100%;
      height: 100%;
    }
  }
  .lf-article__meta {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 40;
    display: flex;
    flex-direction: column;
    padding: var(--space-2xs);
    .lf-article__title {
      font-family: var(--font-title);
      font-weight: 700;
      color: white;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      background-color: transparent;
      overflow: hidden;
      margin: 0;
      line-height: 1.3;
      margin: 0;
      padding: 0;
      align-self: flex-start;
    }
    .lf-article__author {
      font-family: var(--font-author);
      font-size: var(--step--2);
      font-weight: 500;
      color: var(--green);
      margin: 0;
      padding: var(--space-2xs) 0;
      background-color: transparent;
      align-self: flex-start;
      @media (min-width: 768px) {
        font-weight: 600;
      }
    }
    .lf-article__date {
      display: inline-block;
      margin: 0;
      padding: 0;
      font-size: 11px;
      font-family: "Open Sans";
      font-weight: 600;
      color: var(--slate-200);
      background-color: transparent;
      align-self: flex-start;
      @media (min-width: 425px) {
        font-size: 12px;
      }
    }
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
