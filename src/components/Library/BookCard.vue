<script setup lang="ts">
import VLazyImage from 'v-lazy-image'
type Book = {
  imageUrl: string
  title: string
}
const props = defineProps<{
  book: Book
}>()
defineEmits(['openModal'])
</script>

<template>
  <div class="book-card" @click="$emit('openModal', props.book)">
    <div
      class="book-card__image-wrapper"
    >
      <v-lazy-image
        :src="props.book.imageUrl"
        :alt="props.book.title"
        src-placeholder="/lazy-image-placeholder.webp"
        class="book-card__image"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.book-card {
  position: relative;
  margin-bottom: 1rem;
  .book-card__image {
    object-fit: contain;
    aspect-ratio: 1/1;
    width: 100%;
    height: 100%;
    min-height: 200px;
    max-height: 300px;
    filter:
      drop-shadow(0 -2px 0 var(--slate-400))
      drop-shadow(0 2px 0 var(--slate-400))
      drop-shadow(-2px 0 0 var(--slate-400))
      drop-shadow(2px 0 0 var(--slate-400))
      drop-shadow(0px 0px 10px rgba(0,0,0,.3));
    @media (min-width: 641px) {
      object-fit: contain;
    }
  }
}
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
  background: transparent;
}

html.dark {
  .book-card__image {
    filter:
      drop-shadow(0 -2px 0 var(--slate-600))
      drop-shadow(0 2px 0 var(--slate-600))
      drop-shadow(-2px 0 0 var(--slate-600))
      drop-shadow(2px 0 0 var(--slate-600))
      drop-shadow(0px 0px 10px rgba(0,0,0,.3));
  }
}
</style>
