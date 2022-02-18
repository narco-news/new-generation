<script setup lang="ts">
import { isClient } from '@vueuse/core'
import { useGhostStore } from '~/stores/ghost'
import { useAsyncData } from '~/helpers/useAsyncData'
const useGhost = useGhostStore()
const route = useRoute()
const authorSlug = route.params.id
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
const author = await useAsyncData(
  'author',
  `${uri}/ghost/api/v3/content/authors/slug/${authorSlug}/?key=${key}&include=count.posts&fields=authors`,
  {
    awaitSetup: false,
  },
)
const latestAuthorArticles = computed(() => useGhost.listAuthorArticles(String(authorSlug)))

function loadMoreArticles() {
  useGhost.loadMoreAuthorArticles()
}

useHead({
  title: author.value?.authors[0].name,
})
if (isClient) {
  tryOnMounted(() => {
    useTimeoutFn(() => {
      document.title = author.value?.authors[0].name
    }, 500)
  })
}
</script>

<template>
  <section class="author-page-wrapper">
    <div v-if="author">
      <author-slug-card
        :author="author.authors[0]"
      />
    </div>
    <div v-if="latestAuthorArticles">
      <Pagination
        :articles="latestAuthorArticles"
      />
      <div v-if="latestAuthorArticles.length < author?.count?.posts" class="load-more-button-wrapper">
        <button class="load-more-button" @click="loadMoreArticles">
          Load more
        </button>
      </div>
    </div>
    <div v-else class="folding-cube">
      <folding-cube />
    </div>
  </section>
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
html.dark {
  .load-more-button {
    box-shadow: 0 0 0 1px white;
    color: white;
  }
}
</style>
