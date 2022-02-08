<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
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
      document.title = response.data.tags[0].name
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
const { y } = useWindowScroll()
//
// Scroll to top button
function scrollTop() {
  const intervalId = setInterval(() => {
    if (window.pageYOffset === 0) clearInterval(intervalId)

    window.scroll(0, window.pageYOffset - 50)
  }, 20)
}
</script>
<template>
  <section>
    <div v-if="tag" class="tag-wrapper">
      <div style="display:flex;align-items:baseline">
        <h1 class="tag-name">
          {{ tag.name }}
        </h1>
        <h2 class="tag-count">
          {{ tag.count.posts }} articles
        </h2>
      </div>
      <div
        v-if="y > 4000"
        @click="scrollTop()"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
      </div>
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
  justify-content: space-between;
  padding: 0 10px;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 100;
  background-color: var(--slate-100);
  border-bottom: 2px solid var(--slate-600);
  margin: 0 1rem;
  @media (min-width: 768px) {
    margin: 0;
  }
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
  .tag-wrapper {
    background-color: black;
  }
  .tag-name {
    color: white;
  }
  .load-more-button {
    color: white;
    box-shadow: 0 0 0 1px white;
  }
}
</style>
