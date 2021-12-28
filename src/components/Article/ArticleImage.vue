<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
const props = defineProps<{
  featureImage: string
  title: string
}>()
// Content loader watcher
const hasLoaded = ref(false)
function imageLoaded() {
  hasLoaded.value = true
}
</script>
<template>
  <div class="article__image-wrapper">
    <img
      loading="lazy"
      :src="props.featureImage"
      :alt="props.title"
      class="article-image"
      @load="imageLoaded"
    >
    <!-- <content-loader
      v-show="!hasLoaded"
      :width="1000"
      :height="500"
      :speed="2"
      primary-color="#f3f3f3"
      secondary-color="#ecebeb"
      style="border: 1px solid red"
    >
      <rect
        x="0"
        y="0"
        rx="2"
        ry="2"
        width="1000"
        height="500"
      />
    </content-loader> -->
  </div>
</template>

<style lang="postcss" scoped>
.article__image-wrapper {
  width: 100%;
  max-width: 1000px;
  /* -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0)); */

  @media (min-width: 1000px) {
    padding: 2em 1em;
  }
  & img {
    object-fit: cover;
    width: 100%;
    max-width: 1000px;
    max-height: 500px;
    @media (min-width: 1000px) {
      border-radius: 8px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
    }
  }
}
</style>
