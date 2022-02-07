<script setup lang="ts">
import { useAsyncData } from '~/helpers/useAsyncData'
useHead({
  title: 'Tags',
})
const { t } = useI18n()
// Ghost creds
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
// Get tags
const tagsList = await useAsyncData(
  'tagsList',
  `${uri}/ghost/api/v3/content/tags/?key=${key}&limit=all&include=tags,authors,count.posts&filter=visibility:public`,
  {
    awaitSetup: true,
  },
)
const tags = tagsList.value.tags
  .filter(tag => tag.count.posts >= 3)
  .sort((a, b) => { return b.count.posts - a.count.posts })

</script>

<template>
  <section>
    <h1 class="tags-header">
      {{ t('articles.tags') }}
    </h1>
    <div v-if="tags">
      <router-link v-for="tag in tags" :key="tag.id" :to="`/tags/${tag.slug}`" class="tag-button">
        {{ tag.name }}
        <span>
          {{ tag.count.posts }}
        </span>
      </router-link>
    </div>
    <div v-else style="display:grid;place-content:center;height:100vh">
      <folding-cube />
    </div>
  </section>
</template>

<style lang="postcss" scoped>

.tags-header {
  padding: 0 10px;
  color: var(--slate-800);
  font-weight: 400;
}

.tag-button {
  display: inline-flex;
  align-items: center;
  border: 0;
  background: 0;
  border: 1px solid black;
  border-radius: 9999px;
  padding: 10px;
  margin: 5px;
  text-decoration: none;
  color: black;
  transition: box-shadow 180ms ease-in;
  transition: color 180ms ease-out;
  font-size: clamp(100%, 0.2rem + 2vw, 16px);
  &:hover {
    box-shadow: 0 0 0 2px var(--green);
    border-color: transparent;
    color: var(--green);
  }
  span {
    font-size: 12px;
    font-family: monospace;
    font-weight: 600;
    color: var(--green);
    margin: 0 0.5rem;
  }

}

html.dark {
  .tags-header {
    color: white;
  }
  .tag-button {
    border-color: white;
    color: white;
    &:hover {
      box-shadow: 0 0 0 2px var(--lt-green);
      color: var(--lt-green);
      border-color: transparent;
    }
    span {
      color: var(--lt-green);
    }
  }
}
</style>
