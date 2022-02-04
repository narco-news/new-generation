<script setup lang="ts">
import formatDate from '~/composables/formatDate'
const props = defineProps<{
  article: {}
}>()
</script>

<template>
  <router-link :to="`/articles/${props.article.slug}`">
    <article class="article-latest__article">
      <img
        :src="props.article.feature_image"
        :alt="props.article.title"
        class="article-latest__feature-image"
      >
      <p
        v-for="tag in props.article.tags.slice(0, 1)"
        :key="tag.slug"
        class="article-latest__tag"
      >
        {{ tag.name }}
      </p>
      <div class="article-latest__meta">
        <h3 class="article-latest__title">
          {{ props.article.title }}
        </h3>
        <div class="article-latest__date-author-reading">
          <p class="article-latest__author">
            {{ props.article.primary_author.name }}
          </p>
          <p class="article-latest__date">
            {{ formatDate(props.article.published_at) }}
          </p>
          <p class="article-latest__reading-time">
            {{ props.article.reading_time }}
          </p>
        </div>
        <div class="article-latest__excerpt-wrapper line-clamp">
          <p class="article-latest__excerpt">
            {{ props.article.custom_excerpt }}
          </p>
        </div>
      </div>
    </article>
  </router-link>
</template>

<style lang="postcss" scoped>
.article-latest__article {

}
</style>
