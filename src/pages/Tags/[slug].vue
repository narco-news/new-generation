<script setup lang="ts">
import axios from 'axios'
import { useGhostStore } from '~/stores/ghost'
const route = useRoute()
const useGhost = useGhostStore()
// Ghost creds
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
//
//
const articlesListMax = computed(() => useGhost.listMaxTagArticles)
const tagArticles = computed(() => useGhost.listTagArticles(String(route.params.slug), articlesListMax.value))
const tag = ref()

async function updateTag() {
  tag.value = null
  await axios
    .get(`${uri}/ghost/api/v3/content/tags/slug/${route.params.slug}/?key=${key}&include=tags,authors,count.posts`)
    .then((response) => {
      tag.value = response.data.tags[0]
    })
    .catch((error) => {
      console.error(error)
    })
}
function loadMoreArticles() {
  useGhost.loadMoreTagArticles()
}
//
watchEffect(() => {
  if (route.params.slug && route.matched[0].path === '/tags/:slug')
    updateTag()
    // tryOnMounted(() => {
    //   window.scroll(0, 0)
    // })
})
</script>
<template>
  <section>
    <div v-if="tag" class="tag-wrapper">
      <h1 class="tag-name">
        {{ tag.name }}
      </h1>
      <h2 class="tag-count">
        {{ tag.count.posts }} articles
      </h2>
    </div>
    <div v-if="tagArticles">
      <keep-alive>
        <pagination
          :articles="tagArticles"
        />
      </keep-alive>
      <div v-if="tag" class="load-more-button-wrapper">
        <button v-if="articlesListMax < tag.count?.posts" class="load-more-button" @click="loadMoreArticles">
          Load more
        </button>
      </div>
    </div>
    <div v-else style="display:grid;place-content:center;height:100vh">
      <folding-cube />
    </div>
  </section>
</template>
<style lang="postcss" scoped>
.load-more-button-wrapper {
  display: flex;
  justify-content: center;
}
.load-more-button {
  background: none;
  padding: 1em 2em;
  border: none;
  border-radius: 9999px;
  margin-top: 2em;
  box-shadow: 0 0 0 1px black;
  transition: box-shadow color 180ms ease-in;
  &:hover {
    box-shadow: 0 0 0 2px var(--green);
    color: var(--green);
  }
}
.tag-wrapper {
  display: flex;
  align-items: baseline;
  padding: 0 10px;
}
.tag-count {
  font-weight: 400;
  margin-left: 1em;
  color: var(--green);
}
.tag-name {
  font-family: 400;
  color: var(--slate-800);
}

html.dark {
  .tag-name {
    color: white;
  }
  .load-more-button {
    color: white;
    box-shadow: 0 0 0 1px white;
  }
}
</style>
