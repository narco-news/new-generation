<script setup lang="ts">
import formatDate from '~/composables/formatDate'
import { Article } from '~/ghostTypes'
const props = defineProps<{
  article: Article
}>()
</script>

<template>
  <router-link
    :to="`/articles/${props.article.slug}`"
    class="pagination-article"
    :title="props.article.title"
  >
    {{ props.article.title }}
  </router-link>
</template>

<style lang="postcss" scoped>
.pagination-article {
  border: 1px solid red;
}

</style>
