<script setup lang="ts">
interface Article {
  title: string
  profile_image: string
}
const props = defineProps<{
  article: Article
}>()
const articleRef = ref()
const articleHovered = useElementHover(articleRef)
const hoverTextStyles = ref('none')
const hoverImageStyles = ref('grayscale(80%)')
watchEffect(() => {
  if (articleHovered.value) {
    hoverTextStyles.value = 'underline'
    hoverImageStyles.value = 'none'
  }
  else {
    hoverTextStyles.value = 'none'
    hoverImageStyles.value = 'grayscale(80%)'
  }
})
</script>

<template>
  <router-link :to="`/articles/${props.article.slug}`">
    <article ref="articleRef" class="article-opinion">
      <div class="meta">
        <p class="article-opinion__author-name">
          {{ props.article.primary_author.name }}
        </p>
        <h2 class="article-opinion__title">
          {{ props.article.title }}
        </h2>
      </div>
      <img
        :src="props.article.primary_author.profile_image"
        :alt="props.article.primary_author.name"
        class="article-opinion__author-image"
      >
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
    font-size: clamp(100%, 0.8rem + 2vw, 28px);
    color: var(--slate-800);
    text-decoration: v-bind('hoverTextStyles');
  }
  /* Author name */
  & .article-opinion__author-name {
    padding: 0;
    margin: 0;
    color: var(--green);
  }
  /* Author image */
  & .article-opinion__author-image {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    filter: v-bind('hoverImageStyles');
    margin: 10px;
    &:hover {
      filter: grayscale(0);
    }

    @media (max-width: 810px) {
      width: 40px;
      height: 40px;
    }
  }
}

html.dark {
  & .article-opinion {
    color: white;

    & .article-opinion__title {
      color: white;
    }
  }
}
</style>
