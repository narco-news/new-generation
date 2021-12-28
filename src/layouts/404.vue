<script setup lang="ts">
import { PostsOrPages } from '@tryghost/content-api'
import { useAsyncData } from '~/helpers/useAsyncData'
import { useGhostStore } from '~/stores/ghost'
const router = useRouter()
const { t } = useI18n()
const useGhost = useGhostStore()
const key = import.meta.env.VITE_GHOST_KEY
const uri = import.meta.env.VITE_GHOST_URI
if (!useGhost.allArticles[0]) {
  const articles = await useAsyncData<PostsOrPages>(
    'articles',
    `${uri}/ghost/api/v3/content/posts/?key=${key}&limit=all&filter=tags:-hash-es&include=authors,tags&fields=slug,title,featured,feature_image,primary_author,published_at,excerpt,custom_excerpt,reading_time`,
    {
      awaitSetup: false,
    },
  )
  useGhost.addArticles(articles.value.posts)
}
</script>

<template>
  <main>
    <router-view v-bind="$attrs" />
    <div>
      <button
        @click="router.back()"
      >
        {{ t('nav.back') }}
      </button>
    </div>
  </main>
</template>
