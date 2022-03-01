<script lang="ts" setup>
import { Article } from '~/ghostTypes'
import formatDate from '~/composables/formatDate'
defineProps<{
  article: Article
}>()
</script>

<template>
  <div
    ref="articleEl"
    class="articles-box__article"
  >
    <div>
      <router-link
        :to="`/articles/${article.slug}`"
      >
        <h1>
          {{ article.title }}
        </h1>
      </router-link>
      <time>
        {{ formatDate(String(article.published_at), 'MMMM DD, YYYY') }}
      </time>
      <p>
        {{ article.custom_excerpt }}
      </p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.articles-box__article {
    --img-ratio: 3/2;
    width: min(45ch, 60vw);
    /* Choose how to align children on scroll */
    scroll-snap-align: center;
    /* Prevents scrolling past more than one child */
    scroll-snap-stop: always;

    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 225px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px, 0 0 0 1px var(--slate-300);
    background-color: white;
    margin: 1rem;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px, 0 0 0 1px var(--green);
    }
    a {
        text-decoration: none;
    }
    h1 {
        font-weight: 400;
        color: var(--slate-800);
    }
    time {
        color: var(--green);
        font-family: monospace;
        font-size: 12px;
    }
    p {
        color: var(--slate-500);
    }
}
/* Soon we can replace this with: gap: 1rem; */
.articles-box__article > * + * {
  margin-top: 1rem;
}

.articles-box__article > img {
  /* Fallback for `aspect-ratio` of defining
  a height */
  height: max(18vh, 12rem);
  object-fit: cover;
  width: 100%;
}

/* When supported, use `aspect-ratio` */
@supports (aspect-ratio: 1) {
  .articles-box__article > img {
    aspect-ratio: var(--img-ratio);
    height: auto;
  }
}

.articles-box__article > img:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}

.articles-box__article > img:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
  margin-top: auto;
}

.articles-box__article > :not(img) {
  margin-left: 1rem;
  margin-right: 1rem;
}

.articles-box__article > :not(img):first-child {
  margin-top: 1rem;
}

/* Enhanced `:not()` accepts a selector list,
but as a fallback you can chain `:not()` instead */
.articles-box__article > :last-of-type:not(img, h2, h3, h4) {
  margin-bottom: 1rem;
}

.articles-box__article > :not(h2, h3, h4) {
  font-size: 0.9rem;
}

.articles-box__article > a {
  align-self: start;
}

html.dark {
  .articles-box__article {
    background-color: #161618;
    box-shadow: rgba(214, 214, 214, 0.1) 0px 4px 12px, 0 0 0 1px var(--slate-800);
    & h1 {
      color: var(--slate-200);
    }
    & time {
      color: var(--green-400);
    }
    & p {
      color: var(--slate-500);
    }
  }
}
</style>
