<script setup lang="ts">
import VLazyImage from 'v-lazy-image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Article } from '~/ghostTypes'
dayjs.extend(relativeTime)

const props = defineProps<{
  article: Article
  showImage?: boolean
}>()
const articleEl = ref()
const isHovered = useElementHover(articleEl)
// CSS
const CSS_titleTextDecoration = ref()
const CSS_imageBoxShadow = ref()
const CSS_excerptColor = ref()
// Watcher
const stopWatcher = watchEffect(() => {
  if (isHovered.value === true) {
    CSS_titleTextDecoration.value = 'underline'
    CSS_imageBoxShadow.value = '0 0 0 2px var(--green)'
    CSS_excerptColor.value = 'var(--slate-700)'
  }
  else {
    CSS_titleTextDecoration.value = 'none'
    CSS_imageBoxShadow.value = '0 0 0 1px var(--slate-400)'
    CSS_excerptColor.value = 'var(--slate-500)'
  }
})
// Cancel
tryOnBeforeUnmount(() => stopWatcher())
</script>

<template>
  <div ref="articleEl">
    <router-link :to="`/articles/${props.article.slug}`" class="link">
      <article class="article">
        <!-- <img
          v-if="props.showImage"
          :src="props.article.feature_image"
          :alt="props.article.title"
          class="image"
        > -->
        <div v-if="props.showImage">
          <v-lazy-image
            :src="props.article.feature_image"
            src-placeholder="/lazy-load-pagination-article.webp"
            :alt="props.article?.title"
            :title="props.article?.title"
            class="image"
          />
        </div>
        <div class="meta">
          <h1 class="title">
            {{ props.article.title }}
          </h1>
          <time class="date">{{ dayjs().to(String(props.article.published_at)) }}</time>
          <p class="excerpt">
            {{ props.article.custom_excerpt }}
          </p>
        </div>
      </article>
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
.link {
  display: block;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
.article {
  max-width: 75ch;
  margin: 1rem auto;
  padding: 0 0.5rem;
  .image {
    object-fit: cover;
    aspect-ratio: 16/9;
    width: 100%;
    max-height: 300px;
    border-radius: 6px;
    box-shadow: v-bind(CSS_imageBoxShadow);
    margin: 1rem 0;
    transition: all 180ms ease-in;
    @media (min-width: 768px) {
      max-height: 225px;
    }
  }
  .meta {
    border-bottom: 1px solid var(--slate-300);
    padding-bottom: 2rem;
    margin: 0 0.5rem;
    margin-bottom: 2rem;
  }
  .title {
    color: var(--slate-800);
    font-family: var(--font-normal);
    font-size: var(--step-2);
    text-decoration: v-bind(CSS_titleTextDecoration);
    transition: all 180ms ease-in;
    max-width: 85%;
    margin: 0;
    padding-bottom: var(--space-xs);
  }
  .date {
    display: block;
    color: var(--green);
    font-family: var(--font-mono);
    padding-bottom: var(--space-xs);
  }
  .excerpt {
    color: v-bind(CSS_excerptColor);
    font-size: var(--step--1);
    transition: all 180ms ease-in;
    margin: 0;
  }
}
.v-lazy-image {
  filter: blur(10px);
  transition: filter 180ms;
}
.v-lazy-image-loaded {
  filter: blur(0);
  background: transparent;
}
html.dark {
  .title {
    color: var(--slate-200);
  }
  .excerpt {
    color: var(--slate-500);
  }
  .meta {
    border-color: var(--slate-800);
  }
  .date {
    color: var(--green-400);
  }
  .image {
    box-shadow: 0 0 0 1px var(--slate-600);
  }
}
</style>
