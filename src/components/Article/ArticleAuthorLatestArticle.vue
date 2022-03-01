<script lang="ts" setup>
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { Article } from '~/ghostTypes'
dayjs.extend(RelativeTime)
defineProps<{
  article: Article
}>()
defineEmits(['changeSlug'])
const excerptTextColor = ref()
const tagTextColor = ref()
const authorArticleElement = ref()
const titleTextDecoration = ref()
const isHovered = useElementHover(authorArticleElement)
const watchHover = watchEffect(() => {
  if (isHovered.value) {
    excerptTextColor.value = 'var(--slate-500)'
    tagTextColor.value = 'var(--green)'
    titleTextDecoration.value = 'underline'
  }
  else {
    excerptTextColor.value = 'var(--slate-400)'
    tagTextColor.value = 'var(--slate-500)'
    titleTextDecoration.value = 'none'
  }
})
tryOnBeforeUnmount(() => watchHover())
</script>

<template>
  <div
    ref="authorArticleElement"
    class="author-article-wrapper"
    @click="$emit('changeSlug', article?.slug)"
  >
    <div
      class="mfa__article-link"
    >
      <img
        :src="article.feature_image"
        :alt="article.title"
        class="mfa__article-image"
      >
      <div class="mfa__article-meta">
        <!--  -->
        <h1
          class="mfa__article-title"
        >
          {{ article.title }}
        </h1>
        <div class="mfa__article-date-tag-wrapper">
          <div
            v-for="tag in article.tags.slice(0, 1)"
            :key="tag.id"
            class="mfa__article-tag"
          >
            {{ tag.name }}
          </div>
          <span style="color: var(--green);margin-right: 0.7rem">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
          </span>
          <time class="mfa__article-date">
            {{ dayjs().to(String(article.published_at)) }}
          </time>
        </div>
        <p
          class="mfa__article-excerpt"
        >
          {{ article.custom_excerpt }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.mfa__article-link {
    cursor: pointer;
    padding: 5px;
    margin: 1rem 10px;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    display: block;
    text-decoration: none;
    border-bottom: 1px solid var(--green-400);
    -webkit-tap-highlight-color: transparent;
    /* IMAGE */
    .mfa__article-image {
    object-fit: cover;
    aspect-ratio: 3/2;
    width: 100%;
    height: 100%;
    max-height: 200px;
    box-shadow: 0 0 0 1px var(--slate-300);
    border-radius: 6px;
    @media (min-width: 768px) {
        max-height: 400px;
      }
    }
    /* CONTENT */
    .mfa__article-meta {
    padding: 0 0.3rem;
    margin: 0.5rem 0 1rem 0;
    .mfa__article-title {
        margin: 0 0 1rem 0;
        padding: 0;
        color: var(--slate-800);
        line-height: 1.3;
        text-decoration: v-bind(titleTextDecoration);
        transition: text-decoration 300ms ease-in-out;
    }
    .mfa__article-date-tag-wrapper {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin: 0;
      margin-bottom: 1rem;
      padding: 0;
    }
    .mfa__article-tag {
        margin-right: 0.7rem;
        color: v-bind(tagTextColor);
        transition: all 180ms ease-out;
        font-weight: 500;
    }
    .mfa__article-date {
      color: var(--green);
    }
    .mfa__article-excerpt {
        margin: 0;
        margin: 0.5rem 0;
        padding: 0;
        color: v-bind(excerptTextColor);
        font-family: sans-serif;
        font-weight: 300;
        line-height: 1.3;
        transition: all 180ms ease-out;
    }
    }
}

html.dark {
  .mfa__article-link {
    .mfa__article-meta {
      .mfa__article-title {
        color: white;
      }
      .mfa__article-date {
        color: var(--green-400);
      }
      .mfa__article-tag {
        color: var(--slate-400);
      }
      .mfa__article-excerpt {
        color: var(--slate-500);
      }
    }
  }
}
</style>
