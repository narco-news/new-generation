<script setup lang="ts">
import { useAsyncData } from '~/helpers/useAsyncData'
useHead({
  title: 'Authors',
})
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
const authorsList = await useAsyncData(
  'authors',
  `${uri}/ghost/api/v3/content/authors/?key=${key}&include=count.posts`,
  {
    awaitSetup: true,
  },
)
const authors = authorsList.value.authors.slice(0, 4)
</script>

<template>
  <section class="author-page-wrapper">
    <h1 class="authors-header">
      Authors
    </h1>
    <div v-if="authors.length" class="authors-card-wrapper">
      <div
        v-for="author in authors"
        :key="author.id"
        class="author-card"
      >
        <SmallArticleCard :author="author" />
      </div>
    </div>
    <div v-else class="folding-cube">
      <folding-cube />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.folding-cube {
  display: grid;
  place-content: center;
  height: 100%;
  @media (min-width: 768px) {
    height: 100vh;
  }
}
.author-page-wrapper {
  max-width: 900px;
  margin: 0 auto;
}
.authors-header {
  font-family: var(--font-normal);
  font-weight: 500;
  padding: 0 10px;
  color: var(--slate-800);
  @media (min-width: 426px) {
    position: sticky;
    top: 5px;
  }
}
.authors-card-wrapper {
  padding: 0 20px;
}

html.dark {
  .authors-header {
    color: white;
  }
}
</style>
