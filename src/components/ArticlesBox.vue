<script lang="ts" setup>
import { Articles } from '~/ghostTypes'
const props = defineProps<{
  articles?: Articles
  direction?: string
}>()
</script>

<template>
  <div
    class="articles-box__wrapper"
  >
    <div
      class="articles-box__header-wrapper"
    >
      <h1
        class="articles-box__header"
      >
        Website Announcements
      </h1>
    </div>

    <!--  -->
    <div
      class="articles-box__articles-wrapper"
    >
      <article
        v-for="article in props.articles.slice(0, 4)"
        :key="article.slug"
      >
        <articles-box-article
          :article="article"
        />
      </article>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.articles-box__wrapper {
    width: auto;
    overflow: hidden;
    margin: 1rem 0.5rem;
    /* padding-bottom: 2rem; */
    .articles-box__header-wrapper {
        margin-bottom: 2rem;
        padding: 1rem 0.5rem 0.5rem 1rem;
        background-color: var(--slate-100);
        border-bottom: 2px solid var(--slate-700);
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        .articles-box__header {
            color: var(--slate-700);
            font-weight: 400;
            font-size: clamp(100%, 1.5rem + 2vw, 32px);
            margin: 0;
            padding: 0;
        }
    }
    .articles-box__articles-wrapper {
        /* Set up container positioning */
        display: grid;
        grid-auto-flow: column;
        grid-gap: 1.5rem;
        /* Enable overflow along our scroll axis */
        overflow-x: auto;
        /* Define axis and scroll type, where
        `mandatory` means any scroll attempt will
        cause a scroll to the next item */
        scroll-snap-type: x mandatory;
        /* padding: 0 0 0rem; */
        padding-bottom: 0.5rem;
        margin: 0;
        /* -webkit-overflow-scrolling: touch; */
        /* &::-webkit-scrollbar {
            display: none;
        } */
    }
}

html.dark {
  .articles-box__wrapper {
    .articles-box__header-wrapper {
      background-color: black;
      border-color: var(--slate-200);
      .articles-box__header {
        color: var(--slate-200);
      }
    }
  }
}
</style>
