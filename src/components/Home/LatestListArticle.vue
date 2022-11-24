<script setup lang="ts">
import VLazyImage from 'v-lazy-image'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Article } from '~/ghostTypes'
import { isDark } from '~/composables'
dayjs.extend(relativeTime)
const props = defineProps<{
  article: Article | undefined
}>()
const articleEl = ref()
const isHovered = useElementHover(articleEl)
// CSS values
const titleTextDecoration = ref()
const imageBoxShadow = ref()
const tagColor = ref()
const titleColor = ref()
const authorColor = ref()
const excerptColor = ref()
// Hover watcher
const stopWatcher = watchEffect(() => {
  if (isHovered.value === true) {
    imageBoxShadow.value = '0 0 0 2px var(--green)'
    titleTextDecoration.value = 'underline'
    titleColor.value = 'var(--green)'
    tagColor.value = 'var(--green)'
    authorColor.value = 'var(--green)'
    excerptColor.value = 'var(--green)'
  }
  else {
    if (isDark.value) {
      //
      imageBoxShadow.value = '0 0 0 2px var(--slate-300)'
      titleTextDecoration.value = 'none'
      tagColor.value = 'var(--green)'
      titleColor.value = 'var(--slate-200)'
      authorColor.value = 'var(--slate-400)'
      excerptColor.value = 'var(--slate-400)'
    }
    else {
      imageBoxShadow.value = '0 0 0 2px var(--slate-300)'
      titleTextDecoration.value = 'none'
      tagColor.value = 'var(--green)'
      titleColor.value = 'var(--slate-800)'
      authorColor.value = 'var(--slate-600)'
      excerptColor.value = 'var(--slate-600)'
    }
  }
})
// Clear watcher
tryOnBeforeUnmount(() => stopWatcher())
</script>

<template>
  <div ref="articleEl" class="article-wrapper">
    <router-link :to="`/articles/${props.article?.slug}`">
      <div class="article-image-wrapper">
        <v-lazy-image
          :src="props.article?.feature_image"
          src-placeholder="/lazy-load-pagination-article.webp"
          :alt="props.article?.title"
          :title="props.article?.title"
          class="article-image"
        />
      </div>
      <div class="meta-wrapper">
        <h2
          v-for="tag in props.article?.tags.slice(0,2)"
          :key="tag.slug"
          class="meta-wrapper__tag"
        >
          {{ tag.name }}
        </h2>
        <h1 class="meta-wrapper__title">
          {{ props.article?.title }}
        </h1>
        <p class="meta-wrapper__excerpt">
          {{ props.article?.custom_excerpt }}
        </p>
        <p class="meta-wrapper__author">
          <span>By</span>
          {{ props.article?.primary_author.name }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
.article-wrapper {
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;

  /* MOBILE STYLES */
  @media (max-width: 425px) {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--slate-300);
  }

  a {
    text-decoration: none;
    -webkit-tap-highlight-color: none;
    .article-image-wrapper {
      margin: 0;
      padding: 0;
      margin-bottom: var(--space-2xs);
      img {
        object-fit: cover;
        aspect-ratio: 4/3;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        box-shadow: v-bind('imageBoxShadow');
        transition: box-shadow 180ms ease-in;
        @media (min-width: 768px) {
          max-height: 200px;
        }
        @media (min-width: 1140px) {
          min-height: 300px;
        }
      }
    }
    .meta-wrapper {
      font-family: var(--font-normal);
      margin-bottom: var(--space-s);
      & > * {
        margin: 0;
        padding: 0;
        padding-top: var(--space-xs);
        transition: all 180ms ease-in-out;
      }
      &__tag {
        display: inline-block;
        font-family: var(--font-normal);
        font-weight: 300;
        font-size: var(--step--2);
        color: v-bind(tagColor);
        margin-right: var(--space-xs);
      }
      &__title {
        font-family: var(--font-title);
        font-size: var(--step-4);
        font-weight: 600;
        color: v-bind(titleColor);
        text-decoration: v-bind(titleTextDecoration);
        @media (min-width: 768px) {
          font-size: var(--step-1);
        }
      }
      &__author {
        color: v-bind(authorColor);
        font-size: var(--step--1);
        font-weight: 500;
        span {
          font-weight: 400;
          font-style: italic;
          letter-spacing: 0.8px;
        }
      }
      &__excerpt {
        color: v-bind(excerptColor);
        font-size: var(--step--1);
        font-weight: 400;
        font-family: var(--font-normal);
        line-height: 1.5;
      }
    }
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
  .article-title {
    color: var(--slate-200);
  }
  .article-author {
    color: var(--slate-400);
  }
  .article-tag {
    color: var(--green);
  }
  .article-date {
    color: var(--slate-400);
  }
  .article-excerpt {
    color: var(--slate-400);
  }
}
</style>
