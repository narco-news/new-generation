<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const props = defineProps<{
  articles: []
}>()
const { t } = useI18n()
const loadMoreArticles = () => useGhost.loadMoreLatest()
const { y } = useWindowScroll()
</script>

<template>
  <h1 class="article-latest__header">
    {{ t('articles.latest') }}
    <div
      v-show="y > 3000"
      class="top-scroll"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
    </div>
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
  /* margin-top: 1rem; */
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
  @media (min-width: 1200px) {
    padding: 1rem 1.5rem;
  }
}
.button-wrapper {
  display: grid;
  place-content: center;
  margin-bottom: 2rem;
}
.load-more-button {
  background: none;
  padding: 1em 2em;
  border: none;
  border-radius: 9999px;
  box-shadow: 0 0 0 1px black;
  transition: box-shadow color 180ms ease-in;
  &:hover {
    box-shadow: 0 0 0 2px var(--green);
    color: var(--green);
  }
}
.articles-latest__wrapper {
  color: black;
  width: 100%;
  overflow: hidden;
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
  .article-latest__header {
    background-color: black;
    color: white;
    border-color: var(--slate-400);
  }
}
</style>
