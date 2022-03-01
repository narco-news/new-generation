<script setup lang="ts">
import VLazyImage from 'v-lazy-image'
import formatDate from '~/composables/formatDate'
import { Article } from '~/ghostTypes'
const props = defineProps<{
  article: Article
}>()
// CSS values
const CSS_authorImageFilter = ref()
const CSS_titleTextDecoration = ref()
const articleLink = ref()
const articleLinkHovered = useElementHover(articleLink)
// Hover watcher
const stopWatcher = watchEffect(() => {
  //
  if (articleLinkHovered.value === true) {
    // Hovered
    CSS_authorImageFilter.value = 'grayscale(0)'
    CSS_titleTextDecoration.value = 'underline'
  }
  else {
    // Default
    CSS_authorImageFilter.value = 'grayscale(.90)'
    CSS_titleTextDecoration.value = 'none'
  }
})
tryOnBeforeUnmount(() => stopWatcher())
</script>

<template>
  <div
    ref="articleLink"
    style="margin:0;padding:0"
  >
    <router-link
      :to="`/articles/${props.article.slug}`"
      class="pa"
      :title="props.article.title"
    >
      <div class="pa__image-wrapper">
        <!-- Image  -->
        <v-lazy-image
          :src="props.article.feature_image"
          src-placeholder="/lazy-load-pagination-article.webp"
          :alt="props.article.title"
          :title="props.article.title"
        />
      </div>
      <div class="pa__meta">
        <h1 class="pa__title">
          {{ props.article.title }}
        </h1>
        <div class="pa__author-box">
          <img
            :src="props.article.primary_author?.profile_image"
            class="pa__author-image"
          >
          <div>
            <p class="pa__author">
              {{ props.article.primary_author?.name }}
            </p>
            <time>
              {{ formatDate(String(props.article.published_at), 'MMM DD, YYYY') }}
            </time>
          </div>
        </div>
        <p
          v-if="props.article.custom_excerpt"
          class="pa__excerpt"
        >
          {{ props.article.custom_excerpt }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<style lang="postcss" scoped>
.pa {
  overflow: hidden;
  height: auto;
  /* height: 100%; */
  /* height: 520px; */
  display: block;
  background-color: white;
  color: black;
  box-shadow: 0 0 0 2px var(--slate-500);
  text-decoration: none;
  border-radius: 6px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px, 0 0 0 1px var(--slate-300);
  transition: box-shadow 180ms ease-in-out;
  &:hover {
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px, 0 0 0 2px var(--green);
  }

  .pa__image-wrapper {
    height: 200px;
    background-color: var(--slate-200);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    overflow: hidden;
    position: relative;
    &::before {
      position: absolute;
      z-index: -10;
      content: 'narco.news';
      color: var(--slate-400);
      display: grid;
      place-content: center;
      height: 100%;
      width: 100%;
      animation: blink 3s linear infinite;
    }
    img {
      object-fit: cover;
      aspect-ratio: 16/9;
      width: 100%;
      height: 100%;
      z-index: 10;
      padding: 0;
      margin: 0;
    }
  }

  .pa__meta {
    padding: 1.5rem clamp(1rem, 5%, 3rem);

    * {
      padding-top: 0.5rem;
    }
    .pa__title {
      font-weight: 400;
      font-size: clamp(100%, 1.5rem + 2vw, 32px);
      color: var(--slate-800);
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding-top: 0;
      text-decoration: v-bind('CSS_titleTextDecoration');
    }
    .pa__author-box {
      display: flex;
      align-items: center;
      div {
        display: flex;
        flex-direction: column;
        padding-top: 0;
        .pa__author {
          color: var(--green);
          margin: 0;
          font-size: 14px;
          font-weight: 500;
        }
        time {
          font-size: 12px;
          font-family: monospace;
          color: var(--slate-600);
        }
      }
      .pa__author-image {
        height: 30px;
        width: 30px;
        border-radius: 100%;
        float: left;
        margin: 0;
        padding: 0;
        margin-right: 1rem;
        margin-top: 0.5rem;
        filter: v-bind('CSS_authorImageFilter');
        transition: filter 180ms ease-in-out;
      }
    }
    .pa__excerpt {
      color: var(--slate-500);
      margin: 0;
      margin-top: 1rem;
      font-family: sans-serif;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: clamp(100%, 1.5rem + 2vw, 16px);
    }
  }
}
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
  background: transparent;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
html.dark {
  .pa {
    background-color: #161618;
    color: white;
    box-shadow: 0 0 0 1px var(--slate-600);
    .pa__meta {
      .pa__title {
        color: white;
      }
      .pa__author-box {
        time {
          color: var(--slate-400);
        }
      }
      .pa__excerpt {
        color: var(--slate-400);
      }
    }
  }
}
</style>
