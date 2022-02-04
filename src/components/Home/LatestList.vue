<script setup lang="ts">
import { Articles } from '~/ghostTypes'
const { t } = useI18n()
const props = defineProps<{
  articles: Articles[]
}>()
</script>

<template>
  <h1 class="latest-list__header">
    {{ t('articles.latest') }}
  </h1>
  <div class="latest-list__wrapper">
    <article
      v-for="article in props.articles"
      :key="article.slug"
      class="article"
    >
      <LatestListArticle :article="article" />
    </article>
  </div>
</template>

<style lang="postcss" scoped>
.latest-list__wrapper {
  --min: 40ch;
  --gap: 1rem;

  display: grid;
  grid-gap: var(--gap);
  /* min() with 100% prevents overflow
  in extra narrow spaces */
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  margin: 1rem;
}

.article {
  height: 100%;
  overflow: none;
  position: relative;
  /* padding: 10px; */
  /* &:nth-child(n+8) {
    ::v-deep(.article-image) {
      display: none;
    }
  } */
  &:nth-child(1) {
    grid-column: 1/-1;
    @media(min-width: 1024px) {
      grid-column: 1/-2;
    }
    ::v-deep(.article-image) {
      @media(min-width: 1440px) {
        max-height: 375px;
      }
    }
  }
  &:nth-child(2) {
    ::v-deep(.article-image) {
      @media(min-width: 1440px) {
        max-height: 375px;
        aspect-ratio: 1/1;
      }
    }
  }
  &:nth-child(6) {
    ::v-deep(.article-wrapper) {
      padding-bottom: 1.2rem;
    }
    ::v-deep(.meta-wrapper) {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 50;
      padding: 20px;
      margin-bottom: 1rem;
      .article-title {
        color: white;
        font-size: 32px;
      }
      .article-author {
        font-weight: 500;
      }
      .article-excerpt {
        color: white;
      }
      .article-date {
        color: white;
      }
      .article-tag {
        color: white;
      }
    }
    ::v-deep(.article-image) {
      height: 100%;
      aspect-ratio: 1/1;
      filter: brightness(55%) saturate(65%);
    }
  }
  &:nth-child(8) {
    grid-column: 1/-1;
    ::v-deep(.article-wrapper) {
      border-bottom: none;
    }
    @media(min-width: 1024px) {
      grid-column: auto;
    }
    ::v-deep(.article-image) {
      @media(min-width: 1440px) {
        max-height: 375px;
      }
    }
  }
}

.latest-list__header {
  font-size: clamp(100%, 1rem + 2vw, 28px);
  font-family: 'Oswald';
  font-weight: 400;
  margin: 1rem 0;
  background-color: var(--slate-100);
  color: black;
  padding: 0.5rem 1rem;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 100;
  @media (min-width: 1200px) {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
}

html.dark {
  .latest-list__header {
    background-color: black;
    color: white;
  }
}
</style>
