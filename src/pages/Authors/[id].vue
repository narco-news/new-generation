<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
import { useAsyncData } from '~/helpers/useAsyncData'
const useGhost = useGhostStore()
// const router = useRouter()
const route = useRoute()
const authorSlug = route.params.id
const latestAuthorArticles = computed(() => useGhost.listAuthorArticles(String(authorSlug)))
const author = ref()
// if (latestAuthorArticles.value.length !== 0) {
// author.value = latestAuthorArticles.value[0].primary_author
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
await useAsyncData(
  'author',
  `${uri}/ghost/api/v3/content/authors/slug/${authorSlug}/?key=${key}&include=count.posts&fields=authors`,
  {
    awaitSetup: true,
  },
).then((response) => {
  author.value = response.value.authors[0]
})

function loadMoreArticles() {
  useGhost.loadMoreAuthorArticles()
}
useHead({
  title: author.value.name,
})
</script>

<template>
  <section class="author-page-wrapper">
    <div v-if="author">
      <AuthorCard :author="author" :show-articles="false" />
    </div>
    <div v-if="latestAuthorArticles">
      <Pagination
        :articles="latestAuthorArticles"
      />
      <div v-if="latestAuthorArticles.length < author.count.posts" class="load-more-button-wrapper">
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

/* .author-card {
    --w:450px;
    --c:(100vw - var(--w));

    max-width:500px;
    margin:10px auto;
    overflow:hidden;
    padding:0 20px 0 clamp(20px,var(--c)*1000,180px);
    position:relative;
    .author-card__image {
        position:absolute;
        top:clamp(0px,var(--c)*-1000,10px);
        left:clamp(0px,var(--c)*-1000,30px);
        width:clamp(50px,var(--c)*1000,150px);
        height:clamp(50px,var(--c)*1000,100%);
        border-radius:clamp(8px,var(--c)*-1000,50px);
        object-fit:cover;
        object-position:top;
    }
    .author-card__meta {
        display: flex;
        flex-direction: column;
        /* margin: 10px 0 10px clamp(0px,var(--c)*-1000,70px); */
    /* .author-card__name {
        padding: 0;
        color: var(--green);
        font-size: clamp(100%, 3rem + 2vw, 42px);
        margin: 10px 0 10px clamp(0px,var(--c)*-1000,70px);
    }
    .author-card__bio {
        color: var(--slate-600);
        font-weight: 500;
        padding: 0;
        margin: 10px 0;
        max-width: 65ch;
    }
    .author-card__social-links {
        display: flex;
        align-items: center;
    }
    .author-card__website-link {
        color: var(--vue-black);
        margin: 0 10px;
        display: grid;
        place-content: center;
    }
    .author-card__twitter-link {
        margin: 0 10px;
        display: grid;
        place-content: center;
    }
    .author-card__mail-link {
        color: var(--vue-black);
        margin: 0 10px;
        display: grid;
        place-content: center;
    }
    .author-card__patreon-link {
        display: inline-flex;
        align-items: center;
        width: auto;
        border: 1px solid var(--vue-black);
        color: var(--vue-black);
        text-decoration: none;
        padding: 3px 6px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        margin: 0 10px;
        svg {
            margin-left: 0.5em;
        }
    }
} */
html.dark {
  .load-more-button {
    box-shadow: 0 0 0 1px white;
    color: white;
  }
}
</style>
