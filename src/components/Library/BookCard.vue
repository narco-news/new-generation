<script setup lang="ts">
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
    {{ props.book.title }}
  </div>
</template>

<style lang="postcss" scoped>
.book-card {
  position: relative;
  margin-bottom: 1rem;
  .book-image {
    object-fit: contain;
    aspect-ratio: 1/1;
    width: 100%;
    height: 100%;
    max-height: 250px;
    @media (min-width: 641px) {
      object-fit: contain;
    }
    &[lazy='loading'] {
      display: inline-block;
    }
  }
}
</style>
