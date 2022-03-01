<script lang="ts" setup>
import axios from 'axios'
import { onBeforeRouteLeave } from 'vue-router'
import { useAsyncData } from '~/helpers/useAsyncData'
import formatDate from '~/composables/formatDate'
import NewsletterSignUp from '~/components/NewsletterSignUp.vue'
// Ghost keys
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
// Declare route and router
const route = useRoute()
const router = useRouter()
// Call Ghost API to get article
const article = await useAsyncData(
  'article',
  `${uri}/ghost/api/v3/content/posts/slug/${route.params.slug}/?key=${key}&include=tags,authors`,
  {
    awaitSetup: false,
  },
)
// Set HEAD
useHead({
  meta: [
    { name: 'og:description', content: article.value?.posts[0].custom_excerpt },
    { name: 'og:image', content: article.value?.posts[0].feature_image },
    { name: 'og:title', content: article.value?.posts[0].title },
    { name: 'og:author', content: article.value?.posts[0].primary_author?.name },
    { name: 'og:url', content: `https://narco.news/articles/${article.value?.posts[0].slug}` },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
// Change article function
function changeArticle(slug: string) {
  article.value = undefined
  axios.get(
    `${uri}/ghost/api/v3/content/posts/slug/${slug}/?key=${key}&include=tags,authors`,
  )
    .then((response) => {
      useTimeoutFn(() => {
        article.value = response.data
      }, 300)
      document.title = response.data.posts[0]?.title
    })
}
// Watcher for slug change
const slug = ref()
const slugWatcher = watchEffect(() => slug.value = route.params.slug)
watch(slug, () => {
  try {
    changeArticle(String(slug.value))
  }
  catch (error) {
    console.error(error)
  }
})
// Stop watcher on route leave
onBeforeRouteLeave(() => slugWatcher())

// tryOnMounted(() => {
//   const watchChangeArticle = watchEffect(() => {
//     try {
//       if (route.params.slug)
//         changeArticle(String(route.params.slug))
//     }
//     catch (error) {
//       console.error(error)
//     }
//   })
// })
</script>

<template>
  <section>
    <div v-if="article">
      <!-- IMAGE -->
      <article-image
        :feature-image="article.posts[0].feature_image"
      />
      <!-- META -->
      <article-meta
        :article="article.posts[0]"
      />
      <!-- CONTENT -->
      <article-content
        :content="article.posts[0].html"
      />
      <!-- BOTTOM SHARE BUTTONS -->
      <div ref="bottomButtons">
        <article-bottom-buttons
          :article="article.posts[0]"
        />
      </div>
      <!-- BOTTOM META -->
      <div class="tags-wrapper">
        Filed Under:
        <router-link
          v-for="tag in article.posts[0].tags?.slice(0, 4)"
          :key="tag.id"
          :to="`/tags/${tag?.slug}`"
          class="article-meta__tag"
        >
          {{ tag.name }}
        </router-link>
      </div>
      <div class="last-updated">
        Updated:
        <time>
          {{
            formatDate(article.posts[0].updated_at, 'hh:mm:ss A, MM/DD/YY')
          }}
        </time>
      </div>

      <!-- COMMENTS START -->
      <!-- <the-comments /> -->
      <!-- COMMENTS END -->

      <!-- Author Latest -->
      <div ref="authorLatest">
        <article-author-latest
          :author="article.posts[0].primary_author"
          @change-slug="router.push(`/articles/${$event}`)"
        />
      </div>
      <!-- ConvertKit Newsletter Signup -->
      <!-- <div>
        <NewsletterSignUp :border="false" />
      </div> -->
      <!-- Tag Latest -->
      <div ref="tagLatest">
        <article-tag-latest
          :tags="article.posts[0].tags"
          @change-slug="router.push(`/articles/${$event}`)"
        />
      </div>
    </div>
    <div v-else class="loading">
      <FoldingCube />
    </div>
    <!-- BOTTOM META BAR -->
    <!-- <div v-if="article">
      <article-bottom-bar
        :article="article.posts[0]"
        :title-visibility="titleVisible"
      />
    </div> -->
  </section>
</template>

<style lang="postcss" scoped>
section {
  /* overflow: hidden; */
  overflow:initial !important;
}
.loading {
    width: 100%;
    height: 100vh;
}
.last-updated {
  margin: 1.5rem 1rem;
  font-size: 12px;
  font-family: sans-serif;
  font-weight: 400;
  color: var(--slate-500);
  padding-bottom: 2rem;
  time {
    font-weight: 500;
    padding: 0.5rem;
  }
}
.tags-wrapper {
  margin: 1.5rem 1rem;
  font-size: 12px;
  font-family: sans-serif;
  font-weight: 400;
  color: var(--slate-500);
}
.article-meta__tag {
  display: inline-flex;
  color: var(--green);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px dotted var(--green);
  margin: 0 0.5rem;
  &:hover {
    border-bottom: 1px solid var(--green);
  }
}
</style>

<route lang="yaml">
meta:
  layout: article
</route>
