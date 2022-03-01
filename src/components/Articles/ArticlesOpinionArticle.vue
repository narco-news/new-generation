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
const CSS_authorTextColor = ref()
// Hover watcher
const articleElHovered = useElementHover(articleEl)
const stopWatcher = watchEffect(() => {
  if (articleElHovered.value === true) {
    //
    CSS_titleTextDecoration.value = 'underline'
    CSS_titleColor.value = 'var(--green-400)'
    CSS_authorImageFilter.value = 'none'
    CSS_authorTextColor.value = 'var(--green-400)'
  }
  else {
    // Default
    CSS_titleTextDecoration.value = 'none'
    CSS_titleColor.value = 'var(--green)'
    CSS_authorImageFilter.value = 'saturate(20%)'
    CSS_authorTextColor.value = 'var(--green)'
  }
})
tryOnBeforeUnmount(() => stopWatcher())
</script>

<template>
  <div ref="articleEl">
    <router-link
      :to="`https://narco.news/articles/${props.article.slug}`"
      :title="props.article.title"
      class="opinion__article"
    >
      <!-- ARTICLE -->
      <div class="opinion__meta">
        <h2 class="opinion__author">
          {{ props.article.primary_author?.name }}
        </h2>
        <h1 class="opinion__title">
          {{ props.article.title }}
        </h1>
      </div>
      <div class="opinion__image-wrapper">
        <img
          :src="props.article.primary_author?.profile_image"
          :alt="props.article.primary_author?.name"
          class="opinion__author-image"
        >
      </div>
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
a {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-decoration: none;
  padding: 1.5rem clamp(1rem, 5%, 3rem);
  &:last-child {
    border-bottom: none;
  }
  @media (min-width: 640px) {
    border: none;
  }
}
.opinion__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 85%;
}
.opinion__title {
  color: v-bind('CSS_titleColor');
  text-decoration: v-bind('CSS_titleTextDecoration');
  font-family: 'Noto Serif';
  font-weight: 600;
  margin: 0;
  padding: 0;
  padding-right: 2rem;
  font-size: clamp(100%, 1.5rem + 2vw, 28px);
  transition: all 180ms ease-in;
}
.opinion__author {
  font-size: 14px;
  font-weight: 500;
  color: v-bind(CSS_authorTextColor);
  font-family: 'Quicksand';
  margin: 0;
  padding: 0;
  padding-bottom: 0.5rem;
  transition: all 180ms ease-in;
}
.opinion__image-wrapper {
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 0 2px var(--green-400);
    height: 45px;
    width: 45px;
    margin-top: 0.5rem;
    .opinion__author-image {
      filter: v-bind('CSS_authorImageFilter');
      transition: all 180ms ease-in;
      object-fit: cover;
      aspect-ratio: 1/1;
      width: 100%;
      height: 45px;
      transform: scale(1.2);
    }
}

html.dark {
    .opinion__title {
        color: v-bind(CSS_titleColor);
    }
    .opinion__author {
        color: var(--green-400);
    }
}
</style>
