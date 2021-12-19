<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const ghostStore = useGhostStore()
const article = computed(() => ghostStore.listCurrentArticle)
</script>

<template>
  <article>
    <h1>{{ article?.title }}</h1>
    <div class="article-wrapper">
      <div class="article-content" v-html="article?.html" />
    </div>
  </article>
</template>

<style lang="postcss" scoped>
.article-wrapper {
  border: 1px solid blue;
  /*  */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 65ch;
  position: relative;

  & ::v-deep(.article-content) {
    width: 65ch;
    font-family: 'Noto Serif';
    font-weight: 400;
    & img {
      width: 65ch;
    }

    & figure {
      margin: 0;
    }
  }
}
</style>

<route lang="yaml">
meta:
  layout: article
</route>
