<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const props = defineProps<{
  articles: []
}>()
const { t } = useI18n()
const loadMoreArticles = () => useGhost.loadMoreLatest()
</script>

<template>
  <h1 class="article-latest__header">
    {{ t('articles.latest') }}
  </h1>
  <div class="articles-latest__wrapper">
    <div
      v-for="article in props.articles"
      :key="article.slug"
      class="articles-wrapper"
    >
      <pagination-article
        :article="article"
      />
    </div>
  </div>
  <div class="button-wrapper">
    <button class="load-more-button" @click="loadMoreArticles">
      Load More
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.article-latest__header {
  font-size: clamp(100%, 1.5rem + 2vw, 32px);
  font-family: 'Oswald';
  font-weight: 400;
  margin: 0 0.5rem;
  margin-top: 1rem;
  padding: 1rem;
  color: var(--slate-700);
  background-color: var(--slate-100);
  border-bottom: 2px solid var(--slate-700);
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 200;
  @media (min-width: 1200px) {
    /* border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px; */
    padding: 1rem 1.5rem;
    margin-top: 2rem;
  }
}
.button-wrapper {
  display: grid;
  place-content: center;
}
.load-more-button {
  background: none;
  padding: 1em 2em;
  border: none;
  border-radius: 9999px;
  margin-top: 2em;
  box-shadow: 0 0 0 1px black;
  transition: box-shadow color 180ms ease-in;
  &:hover {
    box-shadow: 0 0 0 2px var(--green);
    color: var(--green);
  }
}
.articles-latest__wrapper {
  color: black;
  padding: 5px;
  width: 100%;
  overflow: hidden;
  margin-top: 1rem;
  padding: 2rem;
  /* first breakpoint*/
  --w1:800px;
  --n:4;
  /* second breakpoint*/
  --w2: 640px;
  --m: 2;
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
  gap: 20px;
  .articles-wrapper {
    margin-bottom: 2rem;
  }
}

html.dark {
  .load-more-button {
    box-shadow: 0 0 0 1px white;
    color: white;
  }
}
</style>
