<script setup lang="ts">
const props = defineProps<{
  featureImage?: string
  title?: string
}>()
const isLoaded = ref(false)
</script>

<template>
  <div class="article-image__wrapper">
    <!-- <ImageLoader v-show="!isLoaded" /> -->
    <img
      :src="props?.featureImage"
      :alt="props?.title"
      class="article-image__image"
      @load="isLoaded = true"
    >
  </div>
</template>

<style lang="postcss" scoped>
.article-image__wrapper {
  min-width: 300px;
  @media (min-width: 768px) {
    margin: 2rem;
  }
  .article-image__image {
    aspect-ratio: 4/3;
    object-fit: cover;
    width: 100%;
    max-height: 500px;
    @media (min-width: 768px) {
      aspect-ratio: 16/9;
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}
</style>
