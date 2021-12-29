<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
import formatDate from '~/composables/formatDate'
import Article from '~/ghostTypes'
const props = defineProps<{
  article: Article
}>()
const imageLoaded = ref(false)
</script>

<template>
  <router-link
    :to="`/articles/${props.article.slug}`"
    class="pagination-article hvr-float"
  >
    <div class="pagination-article__image-wrapper">
      <img
        :show="imageLoaded"
        :src="props.article.feature_image"
        loading="lazy"
        class="pagination-article__image"
        @load="imageLoaded = true"
      >
      <content-loader
        v-if="!imageLoaded"
        :width="400"
        :height="300"
        :speed="2"
        primary-color="#f3f3f3"
        secondary-color="#ecebeb"
      >
        <rect
          x="0"
          y="0"
          rx="2"
          ry="2"
          width="400"
          height="300"
        />
      </content-loader>
    </div>
    <div class="article-meta">
      <div class="article-meta__author-date-reading">
        <div style="display:flex;flex-wrap:nowrap">
          <p class="article-meta__date">
            {{ formatDate(props.article.published_at, 'MMM DD') }}
          </p>
          <span style="padding: 0 0.5em;display:grid;place-content: center;">·</span>
          <!-- <p class="article-meta__reading-time">
            &nbsp;&nbsp;·&nbsp;&nbsp;{{ props.article.reading_time }} minutes
          </p> -->
        </div>
        <p class="article-meta__tag">
          #{{ props.article.tags[0]?.slug || 'misc' }}
        </p>
      </div>
      <h1 class="article-meta__title">
        {{ props.article.title }}
      </h1>
      <h2 class="article-meta__author">
        {{ props.article.primary_author.name }}
      </h2>
      <p v-if="props.article.custom_excerpt">
        {{ props.article.custom_excerpt }}
      </p>
      <p v-else>
        {{ props.article.excerpt }}
      </p>
    </div>
  </router-link>
</template>

<style lang="postcss" scoped>
.pagination-article {
  /*  */
  width: 100%;
  display: block;
  text-decoration: none;
  color: black;
  font-size: 12px;
  height: 300px;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  border: 1px solid var(--slate-300);

  &:hover {
    border-color: var(--green);
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  }

  .article-meta {
    position: absolute;
    bottom: 0;
    /* background-color: rgba(255, 255, 255, 0.637);
    -webkit-backdrop-filter: blur(5px) brightness(60%);
    backdrop-filter: blur(20px) brightness(100%); */
    background-color: white;
    height: auto;
    width: 100%;
    margin: 0;
    padding: 10px;
    .article-meta__title {
      font-weight: 600;
      padding-top: 0.2em;
      margin: 0;
      color: var(--vue-black);
    }
    .article-meta__tag {
      color: var(--slate-500);
      font-weight: 500;
      white-space: nowrap;
      margin: 0;
      padding: 5px 0;
    }
    .article-meta__author {
        color: var(--green);
        font-family: 'Oswald';
        font-weight: 400;
      }
    .article-meta__author-date-reading {
      display: flex;
      /* justify-content: space-between; */
      align-items: baseline;
      flex-wrap: wrap-reverse;

      .article-meta__date {
        color: var(--slate-500);
        font-weight: 500;
        white-space: nowrap;
        margin: 0;
        padding: 5px 0;
      }
      .article-meta__reading-time {
        color: var(--slate-500);
        font-weight: 500;
        white-space: nowrap;
        margin: 0;
        padding: 5px 0;
      }
    }
  }

  .pagination-article__image-wrapper {
    height: 300px;
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    .pagination-article__image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
}
</style>
