<script lang="ts" setup>
import axios from 'axios'
import { onBeforeRouteLeave } from 'vue-router'
import { useAsyncData } from '~/helpers/useAsyncData'
import formatDate from '~/composables/formatDate'
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
    {
      name: 'og:author',
      content: article.value?.posts[0].primary_author?.name,
    },
    {
      name: 'og:url',
      content: `https://narco.news/articles/${article.value?.posts[0].slug}`,
    },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
// Change article function
function changeArticle(slug: string) {
  article.value = undefined
  axios
    .get(
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
const slugWatcher = watchEffect(() => (slug.value = route.params.slug))
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
const titleVisible = ref(true)
function isTitleVisible(event: boolean) {
  titleVisible.value = event
}
const bottomFooter = ref()
const bottomVisible = useElementVisibility(bottomFooter)
</script>

<template>
  <section el="section">
    <article-top-bar :title-visible="titleVisible" />
    <div v-if="article">
      <!-- IMAGE -->
      <article-image :feature-image="article.posts[0].feature_image" />
      <!-- META -->
      <article-meta
        :article="article.posts[0]"
        @title-visible="isTitleVisible($event)"
      />
      <!-- CONTENT -->
      <article-content :content="article.posts[0].html" />

      <div ref="bottomFooter">
        <!-- BOTTOM -->
        <article-bottom-buttons
          :article="article.posts[0]"
        />
        <!-- BOTTOM META -->
        <div class="tags-wrapper">
          Filed Under:
          <router-link
            v-for="tag in article.posts[0].tags?.slice(1, 4)"
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
            {{ formatDate(String(article?.posts[0].updated_at), 'h:mm:ss A, MM/DD/YY') }}
          </time>
        </div>
        <div ref="authorLatest">
          <article-author-latest
            :slug="article?.posts[0]?.slug"
            :author="article?.posts[0]?.primary_author"
            @change-slug="router.push(`/articles/${$event}`)"
          />
        </div>
        <!-- Author Latest -->
        <!-- ConvertKit Newsletter Signup -->
        <!-- <div>
        <NewsletterSignUp :border="false" />
      </div>-->
        <!-- Tag Latest -->
        <div ref="tagLatest">
          <article-tag-latest
            :slug="article.posts[0].slug"
            :tags="article.posts[0]?.tags"
            @change-slug="router.push(`/articles/${$event}`)"
          />
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <FoldingCube />
    </div>
    <!-- BOTTOM META BAR -->
    <article-bottom-bar
      :title-visibility="titleVisible"
      :bottom-visibility="bottomVisible"
    />
  </section>
</template>

<style lang="postcss" scoped>
.loading {
  width: 100%;
  height: 100vh;
}
.last-updated {
  margin: 1.5rem 1rem;
  font-size: 12px;
  font-family: var(--font-normal);
  font-weight: 400;
  color: var(--slate-500);
  padding-bottom: 2rem;
  time {
    font-weight: 500;
    padding: 0.5rem;
    font-family: var(--font-mono);
  }
}
.tags-wrapper {
  margin: 1.5rem 1rem;
  font-size: 12px;
  font-family: var(--font-normal);
  font-weight: 400;
  color: var(--slate-500);
}
.article-meta__tag {
  display: inline-flex;
  color: var(--green);
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-mono);
  margin: 0 0.5rem;
  text-decoration: underline 2px dotted var(--green);
  text-underline-offset: 4px;
}
</style>

<route lang="yaml">
meta:
  layout: article
</route>
