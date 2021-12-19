<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
interface PrimaryAuthor {
  name: string
}
interface Article {
  slug: string
  title: string
  feature_image: string
  primary_author: PrimaryAuthor
}
const props = defineProps<{
  article: Article
}>()
const articleRef = ref()
const imageRef = ref()
const isArticleHovered = useElementHover(articleRef)
watchEffect(() => {
  if (isArticleHovered.value) imageRef.value.style.filter = 'blur(0) grayscale(20%)'
  else
  if (imageRef.value?.style)
    imageRef.value.style.filter = 'blur(3px) grayscale(70%)'
}, {
  flush: 'post',
})
const hideContentLoader = ref(false)
function imageLoaded() {
  hideContentLoader.value = true
}
</script>

<template>
  <router-link :to="`/articles/${props.article.slug}`">
    <article ref="articleRef" class="article__article">
      <div class="article__meta">
        <div class="article__author">
          {{ props.article.primary_author.name }}
        </div>
        <div class="article__heading">
          {{ props.article.title }}
        </div>
      </div>
      <!-- <img class="article__star" src="../assets/star-2.svg" alt="Featured Article"> -->
      <content-loader
        v-show="!hideContentLoader"
        view-box="0 0 300 400"
        :speed="1"
        primary-color="#f3f3f3"
        secondary-color="#d4d4d4"
        style="position: absolute; z-index: 110"
      >
        <rect
          x="0"
          y="0"
          rx="3"
          ry="3"
          width="500"
          height="500"
        />
      </content-loader>
      <img ref="imageRef" :src="props.article.feature_image" class="feature_image" @load="imageLoaded">
    </article>
  </router-link>
</template>

<style lang="postcss" scoped>
.article__article {
  /* border: 1px solid red; */
  /*  */
  position: relative;
  height: 196px;
  overflow: hidden;
  border-radius: 8px;

  @media (max-width: 430px) {
    height: 140px;
  }

  & .feature_image {
    height: inherit;
    width: 100%;
    object-fit: cover;
  }

  & .article__meta {
    position: absolute;
    z-index: 100;
    padding: 10px;
    bottom: 0;
    font-family: 'Oswald';
  }

  /* Title */
  & .article__heading {
    color: white;
    font-size: calc(1rem + 1vw);
    font-family: Oswald;
    font-weight: 700;
    margin: 0;
  }

  /* Author */
  & .article__author {
    color: red;
    font-weight: 400;
    margin: 0;
  }

  /* Star */
  & .article__star {
    z-index: 100;
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    margin: 10px;
  }
}
</style>
