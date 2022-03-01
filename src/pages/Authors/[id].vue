<script setup lang="ts">
import { isClient } from '@vueuse/core'
import axios from 'axios'
import { onBeforeRouteLeave } from 'vue-router'
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const route = useRoute()
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI

const author = ref()
const authorPostCount = ref(0)
const latestAuthorArticles = computed(() => useGhost.listAuthorArticles(String(route.params.id)))

await axios.get(
  `${uri}/ghost/api/v3/content/authors/slug/${route.params.id}/?key=${key}&include=count.posts&fields=authors`,
)
  .then((response) => {
    author.value = response.data
    authorPostCount.value = response.data.authors[0].count.posts
    // if (document)
    //   document.title = response.data.authors[0]?.name
  })

async function changeArticles(authorID: string) {
  author.value = undefined
  await axios.get(
    `${uri}/ghost/api/v3/content/authors/slug/${authorID}/?key=${key}&include=count.posts&fields=authors`,
  )
    .then((response) => {
      useTimeoutFn(() => {
        author.value = response.data
      }, 300)
      authorPostCount.value = response.data.authors[0].count.posts
      document.title = response.data.authors[0]?.name
    })
}

// Watcher for slug change
const slug = ref()
const slugWatcher = watchEffect(() => slug.value = route.params.slug)
watch(slug, () => {
  try {
    changeArticles(String(slug.value))
  }
  catch (error) {
    console.error(error)
  }
})
// Stop watcher on route leave
onBeforeRouteLeave(() => slugWatcher())

// Load more articles
function loadMoreArticles() {
  useGhost.loadMoreAuthorArticles()
}

useHead({
  title: author.value?.authors[0].name,
})

// if (isClient) {
//   tryOnMounted(() => {
//     useTimeoutFn(() => {
//       document.title = author.value?.authors[0].name
//     }, 500)
//   })
// }
</script>

<template>
  <Transition name="fade">
    <section class="author-page-wrapper">
      <div v-if="author">
        <author-slug-card
          :author="author.authors[0]"
        />
      </div>
      <div v-if="author">
        <Pagination
          :articles="latestAuthorArticles"
        />
        <div v-if="latestAuthorArticles.length < authorPostCount" class="load-more-button-wrapper">
          <button class="load-more-button" @click="loadMoreArticles">
            Load more
          </button>
        </div>
      </div>
      <div v-else class="folding-cube">
        <folding-cube />
      </div>
    </section>
  </Transition>
</template>

<style lang="postcss" scoped>
.folding-cube {
  display: grid;
  place-content: center;
  height: 100%;
  @media (min-width: 768px) {
    height: 100vh;
  }
}
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

.author-articles__wrapper {
    padding: 10px; /* first breakpoint*/
    margin-top: 2em;
    --w1: 800px;
    --n: 4;
    /* second breakpoint*/
    --w2: 390px;
    --m: 2;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(
        clamp(
          clamp(
            100%/ (var(--n) + 1) + 0.1%,
            (var(--w1) - 100vw) * 1000,
            100%/ (var(--m) + 1) + 0.1%
          ),
          (var(--w2) - 100vw) * 1000,
          100%
        ),
        1fr
      )
    );
    gap: 20px;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

html.dark {
  .load-more-button {
    box-shadow: 0 0 0 1px white;
    color: white;
  }
}
</style>
