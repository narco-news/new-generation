<script setup lang="ts">
import { Article } from '~/ghostTypes'
const props = defineProps<{
  article: Article
}>()
const articleEl = ref<HTMLElement>()
// CSS values
const CSS_titleTextDecoration = ref()
const CSS_titleColor = ref()
const CSS_authorImageFilter = ref()
// Hover watcher
const articleElHovered = useElementHover(articleEl)
const stopWatcher = watchEffect(() => {
  if (articleElHovered.value === true) {
    //
    CSS_titleTextDecoration.value = 'underline'
    CSS_titleColor.value = 'var(--green)'
    CSS_authorImageFilter.value = 'none'
  }
  else {
    // Default
    CSS_titleTextDecoration.value = 'none'
    CSS_titleColor.value = 'var(--slate-800)'
    CSS_authorImageFilter.value = 'saturate(0.60)'
  }
})
tryOnBeforeUnmount(() => stopWatcher())
</script>

<template>
  <div ref="articleEl">
    <router-link :to="`https://narco.news/articles/${props.article.slug}`">
      <!-- ARTICLE -->
      <div class="opinion__meta">
        <h2 class="opinion__author">
          {{ props.article.primary_author?.name }}
        </h2>
        <h1 class="opinion__title">
          {{ props.article.title }}
        </h1>
      </div>
      <img
        :src="props.article.primary_author?.profile_image"
        :alt="props.article.primary_author?.name"
        class="opinion__author-image"
      >
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
a {
  text-decoration: none;
  display: block;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid var(--slate-300);
  color: var(--slate-800);
  &:last-child {
    border-bottom: none;
  }
  @media (min-width: 640px) {
    border: none;
  }
}
.opinion__meta {
  margin: 1.5rem clamp(0.7rem, 5%, 3rem);
}
.opinion__title {
  color: v-bind('CSS_titleColor');
  text-decoration: v-bind('CSS_titleTextDecoration');
  font-family: 'Noto Serif';
  font-weight: 400;
  margin: 0;
  padding: 0;
  font-size: clamp(100%, 1.5rem + 2vw, 28px);
  transition: all 180ms ease-in;
}
.opinion__author {
  font-size: 14px;
  font-weight: 400;
  color: var(--green);
  text-transform: uppercase;
  font-family: monospace;
  margin: 0;
  padding: 0;
  padding-bottom: 0.5rem;
}
.opinion__author-image {
  float: right;
  border-radius: 100%;
  height: 45px;
  width: 45px;
  margin: 1.5rem clamp(0.7rem, 5%, 3rem);
  filter: v-bind('CSS_authorImageFilter');
  transition: all 180ms ease-in;
}

html.dark {
    .opinion__title {
        color: white;
    }
    .opinion__author {
        color: var(--slate-300);
    }
}
</style>
