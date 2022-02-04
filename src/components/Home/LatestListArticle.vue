<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Article } from '~/ghostTypes'
dayjs.extend(relativeTime)
const props = defineProps<{
  article: Article
}>()
const articleEl = ref()
const titleTextDecoration = ref('none')
const imageBorder = ref('1px solid var(--slate-400)')
const boxShadow = ref('none')
const isHovered = useElementHover(articleEl)
watchEffect(() => {
  if (isHovered.value === true) {
    imageBorder.value = '1px solid var(--green)'
    titleTextDecoration.value = 'underline'
    boxShadow.value = '0 0 0 2px var(--green)'
  }
  else {
    imageBorder.value = '1px solid var(--slate-400)'
    titleTextDecoration.value = 'none'
    boxShadow.value = 'none'
  }
})
</script>

<template>
  <div ref="articleEl" class="article-wrapper">
    <router-link :to="`/articles/${props.article.slug}`">
      <div class="image-wrapper">
        <img
          :src="props.article.feature_image"
          :alt="props.article.title"
          :title="props.article.title"
          class="article-image"
        >
      </div>
      <div class="meta-wrapper">
        <h1
          class="article-title"
        >
          {{ props.article.title }}
        </h1>
        <div class="author-box">
          <img
            :src="props.article.primary_author.profile_image"
            :alt="props.article.primary_author.name"
            :title="props.article.primary_author.name"
          >
          <div
            style="
        margin-left: 1rem;
      "
          >
            <span class="article-author">
              {{ props.article.primary_author.name }}
            </span>
            <div
              style="
          display: flex;
          align-items: center;
        "
            >
              <span class="article-tag">
                {{ props.article.tags[0]?.name }}&nbsp;
              </span>
              –
              <span class="article-date">
                &nbsp;{{ dayjs().to(String(props.article.published_at)) }}
              </span>
            </div>
          </div>
        </div>
        <p class="article-excerpt">
          {{ props.article.custom_excerpt }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
a {
  text-decoration: none;
  -webkit-tap-highlight-color: none;
}
.article-wrapper {
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  @media (max-width: 425px) {
    border-bottom: 1px solid var(--slate-300);
  }
}
.article-title {
  font-size: clamp(100%, 1.3rem + 2vw, 32px);
  color: var(--slate-800);
  text-decoration: v-bind('titleTextDecoration');
}
.image-wrapper {
  /* margin: 0.5rem; */
}
.article-image {
  object-fit: cover;
  aspect-ratio: 16/9;
  width: 100%;
  border: v-bind('imageBorder');
  border-radius: 8px;
  box-shadow: v-bind('boxShadow');
}

.author-box {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--slate-600);
  margin-top: 0.5rem;
  img {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    filter: grayscale(75%);
  }
  .article-author {
    color: var(--green);
    font-weight: 500;
  }
}

.article-excerpt {
  font-family: sans-serif;
  font-size: 14px;
  color: var(--slate-500);
}

html.dark {
  .article-title {
    color: white;
  }
  .article-excerpt {
    color: var(--slate-400);
  }
  .article-tag {
    color: var(--slate-400);
  }
  .article-date {
    color: var(--slate-400);
  }

}
</style>
