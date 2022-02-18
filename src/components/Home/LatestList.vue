<script setup lang="ts">
import { Articles } from '~/ghostTypes'
const { t } = useI18n()
const props = defineProps<{
  articles: Articles
}>()
</script>

<template>
  <section class="latest-list__wrapper">
    <div class="latest-list__header-wrapper">
      <h1 class="latest-list__header">
        {{ t('articles.latest') }}
      </h1>
    </div>
    <div v-if="props.articles" class="latest-list__articles-wrapper">
      <article
        v-for="article in props.articles"
        :key="article.slug"
        class="article"
      >
        <LatestListArticle :article="article" />
      </article>
    </div>
    <div v-else>
      <FoldingCube />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.latest-list__wrapper {
  margin: 1rem 0;
  .latest-list__header-wrapper {
    margin: 2rem 0.5rem;
    margin-top: 1rem;
    padding: 1rem;
    color: var(--slate-700);
    background-color: var(--slate-100);
    border-bottom: 2px solid var(--slate-700);
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 200;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    @media (min-width: 1200px) {
      padding: 1rem 1.5rem;
      margin-top: 2rem;
    }
    .latest-list__header {
      font-size: clamp(100%, 1.5rem + 2vw, 32px);
      font-family: 'Oswald';
      font-weight: 400;
      margin: 0;
    }
  }
}

.latest-list__articles-wrapper {
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
    @media (min-width: 1024px) {
      grid-column: 1/-2;
    }
    ::v-deep(.article-image) {
      @media (min-width: 1440px) {
        max-height: 375px;
      }
    }
  }
  &:nth-child(2) {
    ::v-deep(.article-image) {
      @media (min-width: 1440px) {
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
      aspect-ratio: 1/1;
      height: 100%;
      filter: brightness(55%) saturate(65%);
      @media (min-height: 768px) {
        height: 450px;
      }
      @media (max-height: 1025px) {
        /* height: 100%; */
      }
    }
  }
  &:nth-child(8) {
    grid-column: 1/-1;
    ::v-deep(.article-wrapper) {
      @media (max-width: 768px) {
      padding-bottom: 2rem;
      margin-bottom: 1rem;
      border-bottom: 3px solid var(--green-400);
      }
    }
    @media (min-width: 1024px) {
      grid-column: auto;
    }
    ::v-deep(.article-image) {
      @media (min-width: 1440px) {
        max-height: 375px;
      }
    }
  }
}

html.dark {
  .latest-list__header-wrapper {
    background-color: black;
    color: white;
    border-color: var(--slate-400);
  }
}
</style>
