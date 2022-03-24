<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const useGhost = useGhostStore()
const latestListFive = computed(() => useGhost.listLatestFive)
const featuredArticles = computed(() => useGhost.listFeaturedFourArticles)
const latestList = computed(() => useGhost.listLatestList)
const translationArticles = computed(() => useGhost.listTranslationArticles)
const aroundTheWebArticles = computed(() => useGhost.listAroundTheWebArticles)
const opinionArticles = computed(() => useGhost.listOpinionArticles)
useHead({
  title: 'Home',
})
</script>

<template>
  <section>
    <div v-if="latestListFive">
      <LatestFive :articles="latestListFive" />
    </div>
    <div v-if="featuredArticles.length">
      <ArticlesFeatured :articles="featuredArticles" />
    </div>
    <div v-if="latestList.length">
      <LatestList :articles="latestList" />
    </div>
    <div class="trans-atw">
      <template v-if="translationArticles.length">
        <latest-box
          heading="Translations"
          more-button="Translations"
          slug="translation"
          :articles="translationArticles"
          :show-image="true"
        >
          <p class="box-desc">
            English translations of new and old items from various places.
          </p>
        </latest-box>
      </template>
      <template v-if="aroundTheWebArticles.length">
        <latest-box
          heading="Around the Web"
          slug="around-the-web"
          more-button="ATW"
          :articles="aroundTheWebArticles"
          :show-image="true"
        >
          <p class="box-desc">
            Curation of press articles, essays, and reports published around the web.
          </p>
        </latest-box>
      </template>
    </div>
    <template v-if="opinionArticles.length">
      <div ref="opinionArticlesEl">
        <articles-opinion :articles="opinionArticles" />
      </div>
    </template>
    <div v-else class="loading">
      <FoldingCube />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.loading {
  display: grid;
  place-content: center;
  width: 100%;
  height: 90vh;
  @media (min-width: 1024px) {
    height: 100vh;
  }
}
.trans-atw {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 769px) {
    /* border-bottom: 3px solid var(--slate-600); */
  }
}

.tags-box__wrapper {
  border-bottom: 2px solid var(--slate-600);
  margin: 0 var(--space-2xs);
  margin-bottom: var(--space-2xs);
  padding-bottom: var(--space-m);
}
</style>
