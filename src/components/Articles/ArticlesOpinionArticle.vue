<script setup lang="ts">
interface Article {
  title: string
  profile_image: string
}
const props = defineProps<{
  article: Article
}>()
</script>

<template>
  <router-link :to="`/articles/${props.article.slug}`">
    <article class="article-opinion">
      <div class="meta">
        <p class="article-opinion__author-name">
          {{ props.article.primary_author.name }}
        </p>
        <h2 class="article-opinion__title">
          {{ props.article.title }}
        </h2>
      </div>
      <img :src="props.article.primary_author.profile_image" :alt="props.article.primary_author.name" class="article-opinion__author-image">
    </article>
  </router-link>
</template>

<style lang="postcss" scoped>

a {
  text-decoration: none;
}
.article-opinion {
  /* border: 2px dotted blue; */
  /*  */
  height: auto;
  display: flex;
  flex-wrap: none;
  justify-content: space-between;
  margin-bottom: 0.5em;

  & .meta {
    & a {
      text-decoration: none;
    }
  }
  /* Title */
  & .article-opinion__title {
    width: 90%;
    margin: 0;
    padding: 0;
    font-weight: 400;
    font-size: calc(0.8rem + 1vw);
    color: var(--slate-800);
  }
  /* Author name */
  & .article-opinion__author-name {
    padding: 0;
    margin: 0;
    color: red;
  }
  /* Author image */
  & .article-opinion__author-image {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    filter: grayscale(50%);
    &:hover {
      filter: grayscale(0);
    }

    @media (max-width: 810px) {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
