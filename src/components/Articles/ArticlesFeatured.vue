<script setup lang="ts">
import { Articles } from '~/ghostTypes'
const { t } = useI18n()
const props = defineProps<{
  articles: Articles
}>()
</script>

<template>
  <section class="articles-featured">
    <div class="articles-featured__header-wrapper">
      <h1 class="articles-featured__header">
        {{ t('articles.featured') }}
      </h1>
    </div>
    <div class="articles-featured__articles-wrapper">
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
  padding: 1rem;
  background-color: var(--green);
  @media (min-width: 1100px) {
    margin: 0 0rem 1rem 0rem;
    padding: 1rem 2rem;
    border-radius: 6px;
  }
  .articles-featured__header-wrapper {
    display: flex;
    justify-content: space-between;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 200;
    background-color: var(--green);
    padding: 0.5rem 0;
    .articles-featured__header {
      color: white;
      font-weight: 400;
      margin: 0;
      padding: 0;
      font-size: clamp(100%, 1rem + 2vw, 32px);
    }
  }
  .articles-featured__articles-wrapper {
    margin: 1rem 0;
    --min: 45ch;
    --gap: 1.5rem;

    display: grid;
    grid-gap: var(--gap);
    /* min() with 100% prevents overflow
    in extra narrow spaces */
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
    .articles-featured__article {
      /* margin: 0 0 1.5rem 0; */
    }
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

html.dark {
  .articles-featured {
    background-color: #1cc992;
    .articles-featured__header-wrapper {
      background-color: #1cc992;
    }
  }
}
</style>
