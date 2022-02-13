<script setup lang="ts">
import formatDate from '~/composables/formatDate'
import { Article } from '~/ghostTypes'
const emits = defineEmits(['titleVisible'])
const props = defineProps<{
  article?: Article
}>()
const { t } = useI18n()
const articleTitle = ref()
const isTitleVisible = useElementVisibility(articleTitle)
tryOnMounted(() => {
  watchEffect(() => {
    if (isTitleVisible.value === true)
      emits('titleVisible', true)
    else
      emits('titleVisible', false)
  })
})
</script>

<template>
  <div class="article-meta__wrapper">
    <div class="article-meta__date-reading-wrapper">
      <p class="article-meta__date">
        {{ formatDate(String(props.article.published_at), 'MMM D, YYYY') }}
      </p>
      <span>
        –
      </span>
      <p>
        {{ props.article.reading_time }}
        {{ t('article.minutes') }}
      </p>
      <span style="color:var(--green)">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
      </span>
      <router-link
        v-for="tag in props.article.tags?.slice(0, 1)"
        :key="tag.id"
        :to="`/tags/${tag?.slug}`"
        class="article-meta__tag"
      >
        {{ tag.name }}
      </router-link>
    </div>
    <h1
      ref="articleTitle"
      class="article-meta__title"
    >
      {{ props.article.title }}
    </h1>
    <div class="article-meta__author-date-wrapper">
      <router-link
        :to="`/authors/${props.article?.primary_author?.slug}`"
      >
        <div class="article-meta__author-wrapper">
          <img
            :src="props.article?.primary_author?.profile_image"
            class="article-meta__author-image"
          >
          <h2
            class="article-meta__author"
          >
            {{ props.article.primary_author?.name }}
          </h2>
        </div>
      </router-link>
    </div>
    <p
      v-if="props.article?.custom_excerpt"
      class="article-meta__excerpt"
    >
      {{ props.article.custom_excerpt }}
    </p>
    <p
      v-else
      class="article-meta__excerpt line-clamp-three"
    >
      {{ props.article.excerpt }}
    </p>
  </div>
</template>

<style lang="postcss" scoped>
.article-meta__wrapper {
  width: min(90ch, 100vw);
  margin: 0 auto;
  padding: 0 2em;
  @media (max-width: 425px) {
    padding: 0 10px;
  }
  /*

   */
  /* TAGS */
  .article-meta__tags-wrapper {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    padding: 0;
    margin: 0.5rem 0;
    .article-meta__tag {
      color: var(--slate-600);
      text-decoration: none;
      border-bottom: 1px dotted var(--slate-600);
      font-weight: 500;
      font-size: 11px;
      @media (min-width: 768px) {
        font-size: 13px;
      }
    }
  }
  /* DATE & READING TIME */
    .article-meta__date-reading-wrapper {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-family: monospace;
      span {
        padding: 0 0.5rem;
      }
      a {
        color: var(--green);
        text-decoration: none;
        border-bottom: 1px dotted var(--green);
      }
    }
    .article-meta__date {
      font-weight: 500;
      white-space: nowrap;
      margin: 0;
      color: var(--slate-600);
    }
  /* TITLE */
  .article-meta__title {
    font-size: clamp(100%, 2rem + 2vw, 42px);
    padding: 0;
    margin: 0;
    margin-bottom: 0.5rem;
    /* margin: 1rem 0 2rem 0; */
    color: black;
    @media (min-width: 768px) {
      margin: 1rem 0 2rem 0;
    }
  }
  /* AUTHOR DATE WRAPPER */
  .article-meta__author-date-wrapper {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    color: var(--slate-600);
    margin: 1rem 0;
    padding: 0;
    width: 100%;
    a {
      text-decoration: none;
    }
    .article-meta__author-wrapper {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 0;
    }
    .article-meta__author {
      display: inline-flex;
      color: var(--green);
      font-size: clamp(100%, 0.8rem + 2vw, 24px);
      font-weight: 400;
      border-bottom: 1px dotted var(--green);
      padding-bottom: 3px;
      white-space: nowrap;
      margin: 0;
    }
    .article-meta__author-image {
      display: inline-flex;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      @media (min-width: 768px) {
        width: 45px;
        height: 45px;
      }
    }
  }
  .article-meta__excerpt {
    color: var(--slate-500);
    line-height: 1.5;
    margin: 0;
    font-family: sans-serif;
    font-style: italic;
    font-size: 13px;
    width: auto;
    max-width: 65ch;
    @media (min-width: 768px) {
      max-width: 70ch;
      font-size: 16px;
    }
  }
}

/* SAFARI OUTDATED FLEX GAP FIX */
@supports (-webkit-touch-callout: none) and (not(translate: none)) {
  .article-meta__tags-wrapper {
    .article-meta__tag {
      margin-right: 20px;
    }
  }
  .article-meta__author-date-wrapper {
  .article-meta__author-wrapper {
    .article-meta__author {
      margin-left: 1rem;
    }
  }
  }
}

html.dark {
  .article-meta__title {
    color: var(--slate-100);
  }
  .article-meta__excerpt {
    color: var(--slate-400);
  }
  .article-meta__date {
    color: var(--slate-500);
  }
  .article-meta__tag {
    color: var(--green-400);
  }
  .article-meta__author-date-wrapper {
    .article-meta__author {
      color: var(--green-400);
      border-color: var(--green-400);
    }
  }
  .article-meta__date-reading-wrapper {
    color: var(--slate-500);
  }
}
</style>
