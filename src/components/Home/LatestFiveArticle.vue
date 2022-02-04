<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const props = defineProps<{
  article: {}
}>()
const latestFiveArticle = ref()
const isLatestFiveArticleHovered = useElementHover(latestFiveArticle)
const titleDecorationStyle = ref('none')
const boxShadowStyle = ref('0 0 0 2px transparent')
const filterStyle = ref('brightness(0.55) saturate(1.25)')
const borderStyle = ref('1px solid var(--slate-400)')
const titleColor = ref('white')
const titleBackgroundColor = ref('transparent')
const authorBackgroundColor = ref('transparent')
const authorColor = ref('white')
const imageScale = ref()
const dateBackgroundColor = ref()
watchEffect(() => {
  if (isLatestFiveArticleHovered.value === true) {
    titleDecorationStyle.value = 'underline'
    boxShadowStyle.value = '0 0 0 2px var(--green)'
    borderStyle.value = '1px solid var(--green)'
    filterStyle.value = 'brightness(0.85)'
    titleBackgroundColor.value = 'var(--green)'
    titleColor.value = 'white'
    authorBackgroundColor.value = 'var(--green)'
    authorColor.value = 'white'
    imageScale.value = 'scale(1.1)'
    dateBackgroundColor.value = 'var(--green)'
  }
  else {
    titleDecorationStyle.value = 'none'
    boxShadowStyle.value = '0 0 0 2px transparent'
    borderStyle.value = '1px solid var(--slate-500)'
    filterStyle.value = 'brightness(0.55) saturate(1.25)'
    titleBackgroundColor.value = 'transparent'
    titleColor.value = 'white'
    authorBackgroundColor.value = 'transparent'
    authorColor.value = 'var(--lime)'
    imageScale.value = 'scale(1)'
    dateBackgroundColor.value = 'transparent'
  }
})
const imageLoaded = ref(false)
</script>

<template>
  <div ref="latestFiveArticle" class="lf-article">
    <router-link :to="`/articles/${props.article.slug}`">
      <div class="lf-article__image-wrapper">
        <img
          v-show="imageLoaded"
          :src="props.article.feature_image"
          :alt="props.article.title"
          :title="props.article.title"
          class="lf-article__image"
          @load="imageLoaded = true"
        >
      </div>
      <div
        v-show="imageLoaded"
        class="lf-article__meta"
      >
        <h1 class="lf-article__title line-clamp-three">
          {{ props.article.title }}
        </h1>
        <h2 class="lf-article__author">
          {{ props.article.primary_author.name }}
        </h2>
        <p class="lf-article__date">
          {{ dayjs().to(props.article.published_at) }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
.lf-article {
  height: 100%;
  min-height: 170px;
  display: block;
  border-radius: 8px;
  border: v-bind('borderStyle');
  box-shadow: v-bind('boxShadowStyle');
  transition: border 180ms ease-in;
  transition: box-shadow 180ms ease-in;
  position: relative;
  overflow: hidden;
  z-index: 20;
  a {
    text-decoration: none;
    color: var(--slate-200);
  }
  .lf-article__image-wrapper {
    height: 100%;
    &::before {
      content: 'narco.news';
      font-size: 16px;
      color: var(--slate-400);
      animation: blink 3s linear infinite;
      position: absolute;
      width: 100%;
      height: 100%;
      display: grid;
      place-content: center;
      z-index: -10;
    }
    .lf-article__image {
      filter: v-bind('filterStyle');
      transition: filter 180ms ease-in;
      transition: transform 0.3s ease;
      z-index: 10;
      transform: v-bind('imageScale');
      object-fit: cover;
      object-position: center;
      aspect-ratio: 1/1;
      width: 100%;
      height: 100%;
    }
  }
  .lf-article__meta {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 40;
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    @media (min-width: 425px) {
      padding: 10px;
    }
    .lf-article__author {
      color: v-bind('authorColor');
      font-weight: 400;
      font-size: clamp(100%, 1rem + 2vw, 18px);
      margin: 0;
      padding: 5px 10px 5px 10px;
      background-color: v-bind('authorBackgroundColor');
      align-self: flex-start;
    }
    .lf-article__title {
      color: v-bind('titleColor');
      background-color: v-bind('titleBackgroundColor');
      font-size: clamp(100%, 0.6rem + 2vw, 26px);
      margin: 0;
      line-height: 1.3;
      margin: 0;
      padding: 0 10px 4px 10px;
      align-self: flex-start;
    }
    .lf-article__date {
      display: inline-block;
      padding: 5px 10px;
      margin: 0;
      font-size: 11px;
      font-family: monospace;
      color: white;
      background-color: v-bind('dateBackgroundColor');
      align-self: flex-start;
      @media (min-width: 425px) {
        font-size: 12px;
      }
    }
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

</style>
