<script setup lang="ts">
import { Articles } from '~/ghostTypes'
const props = defineProps<{
  articles: Articles
}>()
</script>

<template>
  <section class="opinion-wrapper">
    <div class="opinion__header-wrapper">
      <h1 class="opinion__header">
        Opinion
      </h1>
      <router-link
        to="/tags/opinion"
      >
        MORE OPINION
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
      </router-link>
    </div>
    <div class="opinion__articles-wrapper">
      <article
        v-for="article in props.articles"
        :key="article.slug"
        class="opinion__article"
      >
        <articles-opinion-article
          :article="article"
        />
      </article>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.opinion-wrapper {
  margin: 1rem 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid var(--green-400);
  .opinion__header-wrapper {
    margin-top: 1rem;
    padding: 1rem 1rem 0.5rem 1rem;
    color: var(--slate-700);
    background-color: var(--slate-100);
    border-bottom: 2px solid var(--slate-600);
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 200;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    @media (min-width: 1200px) {
      padding: 1rem 1.5rem;
      margin-top: 2rem;
    }
    .opinion__header {
        font-size: clamp(100%, 1.5rem + 2vw, 28px);
        font-family: 'Oswald';
        font-weight: 400;
        margin: 0;
    }
    a {
        font-size: 12px;
        text-decoration: none;
        color: var(--slate-500);
        font-family: monospace;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        -webkit-tap-highlight-color: none;
        border-radius: 6px;
        &:hover {
            background-color: var(--slate-200);
        }
    }
  }
  .opinion__articles-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    padding: 1rem;
    @media (min-width: 640px) {
      grid-template-columns: 1fr 1fr;
      padding: 1rem 2rem;
    }
  }
}

html.dark {
    .opinion__header-wrapper {
        background-color: black;
        color: white;
        border-color: var(--slate-400);
        a {
            color: white;
        }
    }
}
</style>
