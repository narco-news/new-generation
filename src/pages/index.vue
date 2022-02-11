<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
useHead({
  title: 'Home',
})
const useGhost = useGhostStore()
const latestListFive = computed(() => useGhost.listLatestFive)
const featuredArticles = computed(() => useGhost.listFeaturedFourArticles)
const latestList = computed(() => useGhost.listLatestList)
const translationArticles = computed(() => useGhost.listTranslationArticles)
const aroundTheWebArticles = computed(() => useGhost.listAroundTheWebArticles)
const opinionArticles = computed(() => useGhost.listOpinionArticles)
</script>

<template>
  <section>
    <div v-if="latestListFive">
      <LatestFive
        :articles="latestListFive"
      />
    </div>
    <div v-if="featuredArticles.length">
      <ArticlesFeatured
        :articles="featuredArticles"
      />
    </div>
    <div v-if="latestList">
      <LatestList
        :articles="latestList"
      />
    </div>
    <template v-if="opinionArticles.length">
      <div ref="opinionArticlesEl">
        <articles-opinion
          :articles="opinionArticles"
        />
      </div>
    </template>
    <div
      class="trans-atw"
    >
      <template
        v-if="translationArticles.length"
      >
        <latest-box
          heading="Translations"
          more-button="Translations"
          slug="translation"
          :articles="translationArticles"
          :show-image="false"
        />
      </template>
      <template v-if="aroundTheWebArticles.length">
        <latest-box
          heading="Around the Web"
          slug="around-the-web"
          more-button="ATW"
          :articles="aroundTheWebArticles"
          :show-image="true"
        />
      </template>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.trans-atw {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
