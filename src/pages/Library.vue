<script setup lang="ts">
import booksList from '../assets/book-list.json'
const { t } = useI18n({ useScope: 'global' })
// useHead({
//   title: 'Library',
//   meta: [
//     {
//       hid: 'og:title',
//       property: 'og:title',
//       content: 'Library',
//     },
//     {
//       hid: 'description',
//       name: 'description',
//       content: 'An aggregate of worthwhile on topics for further understanding',
//     },
//     {
//       hid: 'og:description',
//       property: 'og:description',
//       content: 'An aggregate of worthwhile on topics for further understanding',
//     },
//     {
//       hid: 'og:image',
//       property: 'og:image',
//       content: import('../assets/library-meta-image.png'),
//     },
//     {
//       hid: 'og:site_name',
//       property: 'og:site_name',
//       content: 'narco.news',
//     },
//     {
//       hid: 'og:url',
//       property: 'og:url',
//       content: 'https://narco.news/library',
//     },
//     {
//       hid: 'twitter:card',
//       name: 'twitter:card',
//       content: 'summary_large_image',
//     },
//   ],
// })
</script>

<template>
  <section class="library__wrapper">
    <h1 class="library__header">
      {{ t('nav.library') }}
    </h1>
    <div class="library__booklist-wrapper">
      <div
        v-for="book in booksList.books"
        :key="book.id"
      >
        <book-card :book="book" />
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.library__wrapper {
  margin: 0 1rem;
}
</style>
