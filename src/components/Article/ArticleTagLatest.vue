<script lang="ts" setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useGhostStore } from '~/stores/ghost'
dayjs.extend(relativeTime)
defineEmits(['changeSlug'])
const useGhost = useGhostStore()
const props = defineProps<{
  tags: []
}>()
const tagArticles = await computed(() => useGhost.listTagArticles(props.tags[0]?.slug, 4))
</script>

<template>
  <section class="article-tag-latest">
    <h1 class="section-header">
      Latest
      <span>
        {{ props.tags[0]?.name }}
      </span>
    </h1>
    <div
      v-for="article in tagArticles"
      :key="article.id"
      class="tag-articles-wrapper"
    >
      <article-author-latest-article
        :article="article"
        @change-slug="$emit('changeSlug', $event)"
      />
    </div>
    <router-link
      :to="`/tags/${props.tags[0].slug}`"
      class="more-articles-link"
    >
      THE REST
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z" /><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" /></svg>
    </router-link>
  </section>
</template>

<style lang="postcss" scoped>
section {
  padding: 1rem;
  background-color: white;
  @media(min-width: 992px) {
    border-radius: 16px;
  }
}
.section-header {
  background-color: white;
  border-bottom: 2px solid var(--green);
  color: var(--green);
  font-size: clamp(100%, 0.9rem + 2vw, 2rem);
  font-family: 'Quicksand';
  font-weight: 400;
  position: sticky;
  position: -webkit-sticky;
  z-index: 100;
  top: 0;
  padding: 1rem 0 0.5rem 0;
  margin-top: 1rem;
  margin-bottom: 2rem;
  span {
    font-weight: 600;
  }
}

.tag-articles-wrapper {
  max-width: 80ch;
  margin: 0 auto;
}
.article-link {
  display: block;
  text-decoration: none;
  font-weight: 400;
  color: var(--slate-800);
  border-bottom: 1px solid var(--slate-400);
  padding-bottom: 1rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  cursor: pointer;
  max-width: 65ch;
  .article-title {
    font-weight: 400;
  }
  .article-image {
    object-fit: cover;
    aspect-ratio: 3/2;
    max-height: 300px;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 0 0 1px var(--slate-300);
  }
  .article-excerpt {
    color: var(--slate-500);
  }
  .article-date {
    color: var(--slate-600);
    font-weight: 500;
  }
  .article-author {
    display: inline-flex;
    color: var(--green);
    font-weight: 500;
    padding: 0;
    margin: 0;
  }
}
.more-articles-link {
  color: inherit;
  text-decoration: none;
  padding-bottom: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  display: inline-flex;
  margin: 0 0.5rem;
  margin-bottom: 2rem;
  svg {
    margin-left : 5px;
  }
    background:
    linear-gradient(
      to right,
      var(--slate-800),
      var(--slate-800)
    ),
    linear-gradient(
      to right,
      rgb(233, 45, 20),
      rgb(241, 166, 25),
      rgb(249, 253, 5)
  );
  background-size: 100% 2px, 0 2px;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 400ms;
  &:hover {
      background-size: 0 2px, 100% 2px;
  }
  @media (min-width: 994px) {
    margin: 2rem 7rem;
  }
}

html.dark {
  section {
    background-color: black;
  }
  .section-header {
    background-color: black;
  }
  .more-articles-link {
    color: var(--slate-300);
    border-bottom: 2px solid var(--slate-300)
  }
}
</style>
