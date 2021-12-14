<script setup lang="ts">
const props = defineProps<{
  articles: Array
}>()
</script>
<template>
  <h1>Articles</h1>
  <div class="articles-wrapper">
    <article v-for="article in props.articles" :key="article.slug">
      <ArticlesBoxArticle
        :title="article.title"
        :feature-image="article.feature_image"
      />
    </article>
  </div>
</template>
<style lang="postcss" scoped>
.articles-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 425px) {
    grid-template-columns: 1fr 1fr;
  }
}

article {
  /* border: 2px dashed red; */
  padding: 1em;
}
</style>
