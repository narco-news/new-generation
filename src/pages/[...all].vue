<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const useGhost = useGhostStore()
const article = useGhost.listArticle(route.params.all[0])
if (article.length === 1)
  router.replace(`/articles/${route.params.all[0]}`)
</script>

<template>
  <section>
    <folding-cube v-if="article.length === 1" />
    <div v-else class="wrapper">
      <img class="layout-404__image" src="../assets/Astronaut-big.png" alt="Astronaut">
      <h1 class="layout-404__header">
        {{ t('404.lost') }}
      </h1>
      <p class="layout-404__text">
        {{ t('404.text') }}
      </p>
      <button class="layout-404__back-button" @click="router.replace('/')">
        {{ t('nav.home') }}
      </button>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.layout-404__image {
  max-width: 80%;
  height: 600px;
  object-fit: contain;
  animation: updown 5s ease infinite;
  margin: 0 auto;
  position: absolute;
  left: 10%;
  top: 0;
}

.layout-404__header {
  color: black;
  margin-top: 10em;
  padding: 0 0.5em;
  @media (min-width: 425px) {
    margin-top: 10em;
  }
}
.layout-404__text {
  color: black;
  margin: 0;
  padding: 0 1em;
  max-width: 65ch;
}
.layout-404__back-button {
  background: none;
  color: var(--green);
  border: 1px solid var(--green);
  padding: 1em;
  border-radius: 9999px;
  font-weight: 600;
  margin: 2em auto;
  width: 125px;
  transition: all .2s ease-out;
  &:hover {
    box-shadow: 0 0 0 2px var(--green);
  }
}

@keyframes updown {
  0% {
    transform: translateY(-15%);
  }

  50% {
    transform: translateY(-35%);
  }

  100% {
    transform: translateY(-15%);
  }
}
</style>

<route lang="yaml">
meta:
  layout: 404
</route>
