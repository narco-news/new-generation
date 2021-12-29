<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const props = defineProps<{
  articles: Array<[]>
}>()
</script>

<template>
  <section class="pagination">
    <h1 class="pagination__header">
      Latest
    </h1>
    <div class="pagination__wrapper">
      <article v-for="article in props.articles" :key="article.slug">
        <pagination-article :article="article" />
      </article>
    </div>
    <div class="load-more-wrapper">
      <button @click="useGhost.loadMoreLatest">
        Load More
      </button>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.pagination {
  .pagination__wrapper {
    padding: 10px; /* first breakpoint*/
    --w1: 800px;
    --n: 4;
    /* second breakpoint*/
    --w2: 390px;
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
  }
  .pagination__header {
    font-size: clamp(100%, 1rem + 2vw, 24px);
    font-family: 'Oswald';
    font-weight: 400;
    margin-bottom: 0.5em;
    padding: 5px;
    background-color: var(--green);
    color: var(--slate-50);
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 100;
  }

  .load-more-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1em 0;
    padding: 1em 0;
    button {
      background: none;
      border: 1px solid black;
      border-radius: 9999px;
      padding: 1em 2em;
      font-weight: 600;
      &:hover {
        border: 1px solid var(--green);
        color: var(--green);
      }
    }
  }
}
</style>
