<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const ghostStore = useGhostStore()
const articlesList = computed(() => ghostStore.listOpinionArticles)
</script>
<template>
  <h1 class="articles-opinion__header">
    Opinion
  </h1>
  <div class="articles-opinion">
    <div v-for="article in articlesList" :key="article.slug" class="articles-wrapper">
      <articles-opinion-article :article="article" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.articles-opinion {
  /* border: 1px solid red; */
  color: black;
  padding: 5px;
  width: 100%;
  overflow: hidden;
  /* first breakpoint*/
  --w1:800px;
  --n:3;
  /* second breakpoint*/
  --w2:390px;
  --m:2;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(
      clamp(
        clamp(
          100%/ (var(--n) + 1) + 0.1%,
          (var(--w1) - 100vw) * 1000,
          100%/ (var(--m) + 1) + 0.1%
        ),
        (var(--w2) - 100vw) * 1000,
        100%
      ),
      1fr
    )
  );
  gap: 10px;
}

.articles-opinion__header {
    margin: 0.5em 0;
    padding: 0;
}
html.dark {
  & .articles-opinion {
    background-color: lightcoral;
  }
}
</style>
