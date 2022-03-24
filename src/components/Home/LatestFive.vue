<script setup lang="ts">
import { Articles } from '~/ghostTypes'
const props = defineProps<{
  articles: Articles
}>()
</script>

<template>
  <div class="latest-five__wrapper">
    <article v-for="article in props.articles" :key="article.slug" class="latest-five__article">
      <LatestFiveArticle :article="article" />
    </article>
  </div>
</template>

<style lang="postcss" scoped>
.latest-five__wrapper {
  padding: 0 10px 10px 10px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 0px;
  height: auto;
  max-height: 600px;
  margin-bottom: 0.5rem;

  article {
    height: auto;
    padding: 5px;
  }
  .latest-five__article {
    /* First article */
    height: auto;
    overflow: hidden;
    &:nth-child(1) {
      grid-area: 1 / 1 / 5 / 4;
      ::v-deep(.lf-article) {
        box-shadow: 0 0 0 2px var(--green);

        .lf-article__meta {
          margin-bottom: var(--space-m);
          padding: var(--space-2xs);
          @media (min-width: 768px) {
            padding-left: var(--space-m);
          }

          .lf-article__title {
            font-family: var(--font-title);
            font-size: var(--step-2);
            max-width: 85%;
          }
        }
      }
    }
    /* Second article */
    &:nth-child(2) {
      grid-area: 5 / 1 / 7 / 4;
      ::v-deep(.lf-article__meta) {
        @media (min-width: 768px) {
          padding-left: var(--space-m);
        }
        .lf-article__title {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: var(--font-title);
          font-size: var(--step-0);
          max-width: 95%;
        }
      }
    }
    /* Last Three */
    &:nth-child(n + 3) {
      grid-area: 1 / 4 / 3 / 6;
      ::v-deep(.lf-article__meta) {
        .lf-article__title {
          font-size: var(--step--1);
          @media (max-width: 768px) {
            font-size: 16px;
          }
        }
        .lf-article__author {
          font-size: 12px;
        }
      }
    }

    /* Third Child */
    &:nth-child(3) {
      grid-area: 1 / 4 / 3 / 6;
    }
    /* Fourth Child */
    &:nth-child(4) {
      grid-area: 3 / 4 / 5 / 6;
    }
    /* Fifth Child */
    &:nth-child(5) {
      grid-area: 5 / 4 / 7 / 6;
    }
  }
}
</style>
