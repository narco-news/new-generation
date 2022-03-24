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
    <router-link
      v-for="tag in props.article?.tags?.filter((tag) => tag.slug === 'opinion')"
      :key="tag.id"
      :to="`/tags/${tag?.slug}`"
      class="article-meta__tag"
    >
      {{ tag.name }}
    </router-link>
    <router-link
      v-for="tag in props.article?.tags?.filter((tag) => tag.slug === 'translation')"
      :key="tag.id"
      :to="`/tags/${tag?.slug}`"
      class="article-meta__tag"
    >
      {{ tag.name }}
    </router-link>
    <router-link
      v-for="tag in props.article?.tags?.filter((tag) => tag.slug === 'around-the-web')"
      :key="tag.id"
      :to="`/tags/${tag?.slug}`"
      class="article-meta__tag"
    >
      {{ tag.name }}
    </router-link>
    <router-link
      v-for="tag in props.article?.tags.slice(0, 1).filter((tag) => tag.slug !== 'around-the-web')"
      :key="tag.id"
      :to="`/tags/${tag?.slug}`"
      class="article-meta__tag"
    >
      {{ tag.name }}
    </router-link>
    <h1 ref="articleTitle" class="article-meta__title">
      {{ props.article?.title }}
    </h1>
    <p
      v-if="props.article?.custom_excerpt"
      class="article-meta__excerpt"
    >
      {{ props.article.custom_excerpt }}
    </p>
    <p v-else class="article-meta__excerpt line-clamp-three">
      {{ props.article?.excerpt }}
    </p>
    <div
      class="article-meta__author-wrapper"
    >
      <img :src="props.article?.primary_author?.profile_image" class="article-meta__author-image">
      <div>
        <router-link :to="`/authors/${props.article?.primary_author.slug}`" class="article-meta__author">
          {{ props.article?.primary_author?.name }}
        </router-link>
        <time class="article-meta__date"> {{ formatDate(String(props.article?.published_at), 'MMM DD, YYYY') }}</time>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.article-meta__wrapper {
  width: min(90ch, 100vw);
  margin: 1rem auto;
  margin-bottom: 3rem;
  padding: 0 2em;
  @media (max-width: 425px) {
    padding: 0 10px;
  }
  .article-meta__top {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: var(--step--2);
    @media (max-width: 710px) {
      margin-top: -3rem;
    }
    .article-meta__date {
      display: flex;
      align-items: baseline;
      white-space: nowrap;
      color: var(--slate-500);
      font-family: var(--font-normal);
      font-weight: 500;
      margin: 0;
      svg {
        color: var(--slate-400);
        margin-right: var(--space-2xs);
      }
      @media (max-width: 710px) {
        background-color: var(--slate-100);
        padding: var(--space-xs);
        border-top-left-radius: 4px;
        border-top: 2px solid var(--green);
      }
    }
  }
  .article-meta__tag {
    display: inline;
    color: var(--green);
    font-size: var(--step-1);
    text-decoration-style: dotted;
    text-underline-offset: 6px;
    margin-top: var(--space-2xs);
    margin-left: var(--space-xs);
    margin-right: var(--space-xs);
  }
  .article-meta__title {
    color: var(--slate-800);
    font-family: var(--font-title);
    font-size: var(--step-4);
    font-weight: 700;
    letter-spacing: 1.2;
    line-height: 1.1;
    margin: var(--space-m) 0;
    padding: 0;
    margin-left: var(--space-2xs);
  }
  .article-meta__excerpt {
    color: var(--slate-500);
    font-family: var(--font-serif);
    font-size: var(--step--1);
    font-weight: 500;
    margin: var(--space-xs) 0;
    padding: 0;
    margin-left: var(--space-xs);
    max-width: 85%;
  }
  .article-meta__author-wrapper {
    display: flex;
    align-items: center;
    margin: var(--space-m) 0;
    margin-left: var(--space-2xs);
    div {
      display: flex;
      flex-direction: column;
      gap: var(--space-3xs);
    }
    .article-meta__author-image {
      border-radius: 100%;
      max-height: 40px;
      box-shadow: 0 0 0 2px var(--green);
      margin-right: var(--space-s);
    }
    .article-meta__author {
      color: var(--green);
      font-size: var(--step--1);
      font-weight: 500;
      text-decoration: none;
    }
    .article-meta__date{
      color: var(--slate-400);
      font-weight: 400;
      font-size: var(--step--2);
    }
  }
}

/* SAFARI OUTDATED FLEX GAP FIX */
@supports (-webkit-touch-callout: none) and (not (translate: none)) {
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
    color: var(--slate-300);
  }
  .article-meta__date {
    color: var(--slate-400) !important;
  }
  .article-meta__tag {
    color: var(--green-400);
  }
  .article-meta__author {
    color: var(--green-400) !important;
  }
}
</style>
