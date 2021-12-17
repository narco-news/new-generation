<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const ghostStore = useGhostStore()
const articleList = computed(() => ghostStore.listFeaturedFourArticles)
</script>
<template>
  <div class="component-wrapper">
    <div v-for="article in articleList" :key="article.slug" class="article-wrapper">
      <ArticlesFeaturedFourBoxArticle :article="article" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.component-wrapper {
  /* border: 2px dotted blue; */
  /*  */
  position: relative;
  color: black;
  margin: 1em 0;
  padding: 10px;
  /* height: 200px; */
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  /* first breakpoint*/
  --w1:800px;
  --n:4;
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
</style>
