<script setup lang="ts">
import { Articles } from '~/ghostTypes'
const props = defineProps<{
  articles: Articles[]
}>()
</script>

<template>
  <div
    class="latest-five__wrapper"
  >
    <article v-for="article in props.articles" :key="article.slug" class="latest-five__article">
      <LatestFiveArticle :article="article" />
    </article>
  </div>
</template>

<style lang="postcss" scoped>
.latest-five__wrapper {
  /* border: 1px solid red; */
  padding: 0 10px 10px 10px;
  /*  */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  /* grid-column-gap: 5px; */
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
    }
    /* Second article */
    &:nth-child(2) {
      grid-area: 5 / 1 / 7 / 4;
      ::v-deep(.lf-article__meta) {
        .lf-article__title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          /* margin-bottom: 3px;
          padding-bottom: 3px; */
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
