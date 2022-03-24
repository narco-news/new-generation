<script setup lang="ts">
import { useAsyncData } from '~/helpers/useAsyncData'
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
// Get tags
const tags = ref()
await useAsyncData(
  'tagsList',
  `${uri}/ghost/api/v3/content/tags/?key=${key}&limit=all&include=tags,authors,count.posts&filter=visibility:public`,
  {
    awaitSetup: true,
  },
).then((response) => {
  if (response) {
    tags.value = response.value.tags
      .filter(tag => tag.count.posts >= 3)
      .sort((a, b) => {
        return b.count.posts - a.count.posts
      })
      .slice(0, 16)
  }
})
</script>

<template>
  <section class="tags-box">
    <h1 class="tags-box__header">
      Popular Tags
    </h1>
    <div v-if="tags.length">
      <router-link
        v-for="tag in tags"
        :key="tag.id"
        :to="`/tags/${tag.slug}`"
        class="tags-box__tag-button"
      >
        {{ tag.name }}
        <span>
          {{ tag.count.posts }}
        </span>
      </router-link>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.tags-box {
  margin: 0;
  padding: 0;
  background-color: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  &__header {
    display: block;
    width: 100%;
    font-family: var(--font-normal);
    font-size: var(--step-3);
    color: var(--green);
    text-align: center;
    padding: 0;
    margin: var(--space-s) 0;
  }
  &__tag-button {
      display: inline-block;
      text-decoration: none;
      font-family: var(--font-normal);
      font-size: var(--step--2);
      box-shadow: 0 0 0 1px var(--slate-600);
      border-radius: 9999px;
      color: var(--slate-900);
      padding: var(--space-xs);
      margin: var(--space-2xs);
      span {
          font-family: var(--font-mono);
          font-weight: 500;
          color: var(--green);
          margin-left: var(--space-3xs);
      }
  }

}
</style>
