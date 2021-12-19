<script setup lang="ts">
import formatDate from '~/composables/formatDate'
interface Article {
  title: string
  feature_image: string
  tags: Array
  excerpt: string
  slug: string
}
interface Article {
  article: Article
}
const props = defineProps<{
  article: Article
}>()
</script>

<template>
  <router-link :to="`/articles/${props.article.slug}`">
    <article class="article-latest">
      <img
        :src="props.article.feature_image"
        :alt="props.article.title"
        class="article-latest__feature-image"
      >
      <p
        v-for="tag in props.article.tags.slice(0, 1)"
        :key="tag.slug"
        class="article-latest__tag"
      >
        {{ tag.name }}
      </p>
      <div class="article-latest__meta">
        <h3 class="article-latest__title">
          {{ props.article.title }}
        </h3>
        <div class="article-latest__date-author-reading">
          <p class="article-latest__author">
            {{ props.article.primary_author.name }}
          </p>
          <p class="article-latest__date">
            {{ formatDate(props.article.published_at) }}
          </p>
          <p class="article-latest__reading-time">
            {{ props.article.reading_time }}
          </p>
        </div>
        <div class="article-latest__excerpt-wrapper line-clamp">
          <p class="article-latest__excerpt">
            {{ props.article.custom_excerpt }}
          </p>
        </div>
      </div>
    </article>
  </router-link>
</template>

<style lang="postcss" scoped>
.article-latest {
  height: 300px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  /* Image */
  & .article-latest__feature-image {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    position: absolute;
    top: 0;
    z-index: 10;
  }

  /* Meta */
  & .article-latest__meta {
    position: absolute;
    bottom: 0;
    padding: 10px 5px;
    margin: 0;
    width: 100%;
    background-color: white;
    z-index: 20;

    /* Title */
    & .article-latest__title {
      padding: 0.5em 0;
      margin: 0;
      font-weight: 600;
      color: var(--slate-800);
      font-size: clamp(18px, calc(0.75rem + ((1vw - 3.2px) * 0.25)), 20px);
    }

    /* Excerpt */
    & .article-latest__excerpt-wrapper {
      width: 100%;
      margin: 0 0 1em 0;
      overflow: hidden;

      & p {
        margin: 0;
        padding: 0;
        line-height: 1.3;
      }

      & .article-latest__excerpt {
        font-size: clamp(14px, calc(0.75rem + ((1vw - 3.2px) * 0.25)), 16px);
        color: var(--slate-700);
      }
    }

    & .article-latest__date-author-reading {
      display: flex;
      align-items: center;
      font-size: clamp(16px, calc(0.75rem + ((1vw - 3.2px) * 0.25)), 18px);
      /* Author */
      color: var(--slate-700);
      margin-bottom: 0.2em;
      & .article-latest__author {
        padding: 0;
        margin: 0;
        margin-right: 0.5em;
        white-space: nowrap;
        font-family: 'Oswald';
        font-weight: 400;
      }
      /* Date */
      & .article-latest__date {
        padding: 0;
        margin: 0;
        font-size: clamp(14px, calc(0.75rem + ((1vw - 3.2px) * 0.25)), 16px);
      }
      /* Reading time */
      & .article-latest__reading-time {
        color: red;
        padding: 0;
        margin: 0;
      }
    }
  }
  /* Tags */
  & .article-latest__tag {
    background-color: white;
    color: var(--slate-600);
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    position: absolute;
    top: 0;
    right: 0;
    display: inline-flex;
    padding: 5px;
    margin: 0;
    font-size: clamp(11px, calc(0.75rem + ((1vw - 3.2px) * 0.25)), 12px);
    z-index: 20;
    font-variant: small-caps;
  }
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

html.dark {
  & .article-opinion {
  }
}
</style>
