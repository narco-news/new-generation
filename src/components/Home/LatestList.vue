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
      <article v-for="article in props.articles" :key="article.slug" class="article">
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
    border-bottom: 3px solid var(--slate-700);
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
      font-family: var(--font-normal);
      font-size: var(--step-2);
      letter-spacing: 0.5px;
      text-transform: uppercase;
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
  @media (min-width: 1140px) {
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--slate-600);
  }
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
      box-shadow: 0 0 0 2px var(--green);
      @media (min-width: 768px) {
        min-height: 400px;
      }
      @media (min-width: 1140px) {
        aspect-ratio: 4/3;
        min-height: 400px;
      }
    }
  }
  &:nth-child(2) {
    ::v-deep(.article-image) {
      @media (min-width: 1140px) {
        aspect-ratio: 4/3;
        min-height: 400px;
      }
    }
  }
  /* &:nth-child(6) {
    ::v-deep(.article-image-wrapper) {
      border: 3px solid white;
      border-radius: 6px;
      background-color: white;
      border-bottom: 0;
      img {
        box-shadow: none;
      }
    }
    ::v-deep(.article-wrapper) {
      padding: 1rem;
      margin-bottom: 2rem;
      background-color: var(--green);
      border-radius: 4px;
      border: none;
      box-shadow: rgba(23, 165, 120, 0.4) -5px 5px,
        rgba(23, 165, 120, 0.3) -10px 10px, rgba(23, 165, 120, 0.2) -15px 15px,
        rgba(23, 165, 120, 0.1) -20px 20px, rgba(23, 165, 120, 0.05) -25px 25px;
    }
    ::v-deep(.meta-wrapper) {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 50;
      margin: 1rem;
      margin-bottom: 5rem;
      .article-title {
        background-color: var(--green);
        color: white;
        font-size: var(--step-3);
        padding: var(--space-2xs);
      }
      .author-box {
        margin-left: var(--space-xs);
        padding: var(--space-xs) var(--space-2xs);
      }
      .article-author {
        color: white;
        font-weight: 500;
      }
      .article-excerpt {
        color: white;
        margin-left: var(--space-xs);
      }
      .article-date {
        color: white;
        font-weight: 500;
      }
      .article-tag {
        color: white;
        margin-left: var(--space-s);
      }
    }
    ::v-deep(.article-image) {
      aspect-ratio: 1/1;
      height: 100%;
      filter: brightness(40%) saturate(55%);
      @media (min-height: 768px) {
        height: 450px;
      }
      @media (max-height: 1025px) {
        /* height: 100%; */

  &:nth-child(8) {
    grid-column: 1/-1;
    ::v-deep(.article-wrapper) {
      @media (max-width: 768px) {
        padding-bottom: 3rem;
        margin-bottom: 0rem;
        border-bottom: 2px solid var(--slate-600);
      }
    }
    @media (min-width: 1024px) {
      grid-column: auto;
    }
    ::v-deep(.article-image) {
      @media (min-width: 768px) {
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
