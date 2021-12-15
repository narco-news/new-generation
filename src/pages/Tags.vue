<script setup lang="ts">
import { computed } from 'vue'
import { useGhostStore } from '../stores/ghost'
import TagsBox from '../components/TagsBox.vue'
useHead({
  title: 'Tags',
})
const ghost = useGhostStore()
ghost.getTags()
const tags = computed(() => ghost.listTags)
const tagArticles = computed(() => ghost.listSelectedTagArticles)
</script>
<template>
  <tags-box :tags="tags" />
  <articles-box :articles="tagArticles" />
</template>
