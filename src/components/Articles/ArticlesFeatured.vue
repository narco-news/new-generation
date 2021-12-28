<script setup lang="ts">
import { PostsOrPages } from '@tryghost/content-api'
const props = defineProps<{
  articles: PostsOrPages
}>()
</script>

<template>
  <section class="articles-featured">
    <h1 class="articles-featured__header">
      Featured
    </h1>
    <div class="articles-featured__wrapper">
      <article
        v-for="article in props.articles"
        :key="article.slug"
        class="articles-featured__article"
      >
        <articles-featured-article :article="article" />
      </article>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.articles-featured {
  & .articles-featured__wrapper {
    /* border: 1px solid red; */
    position: relative;
    margin: 0.5em 0;
    padding: 10px;
    width: 100%;
    overflow: hidden;
    /* first breakpoint*/
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
    gap: 25px;

    @media (max-width: 768px) {
      gap: 15px;
    }

    & .articles-featured__article {
      height: 165px;

      @media (max-width: 425px) {
        height: 120px;
      }
    }
  }
  & .articles-featured__header {
    font-size: clamp(100%, 1rem + 2vw, 24px);
    font-family: 'Oswald';
    font-weight: 400;
    margin: 0;
    padding: 0 0.5em;
    color: var(--green);
  }
}

html.dark {
  .articles-featured__header {
    color: white;
  }
}
</style>
