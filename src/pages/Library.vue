<script setup lang="ts">
import booksList from '../assets/book-list.json'
const { t } = useI18n({ useScope: 'global' })
const showModal = ref(false)
const modalBook = ref({})
function createModal(book) {
  modalBook.value = book
  showModal.value = true
}
</script>

<template>
  <section class="library__wrapper">
    <h1 class="library__header">
      {{ t('nav.library') }}
    </h1>
    <i18n-t global keypath="library.intro" tag="p" class="library__intro">
      <template #book>
        <span style="font-style:italic;font-weight:500">{{ t('library.narcoHistory') }}</span>
      </template>
    </i18n-t>
    <div class="library__books-wrapper">
      <div v-for="book in booksList.books" :key="book.id">
        <BookCard :book="book" @open-modal="createModal($event)" />
      </div>
      <transition name="modal">
        <book-modal
          v-if="showModal"
          @close="showModal = false"
          @wheel.prevent
          @touchmove.prevent
          @scroll.prevent
        >
          <div style="display:flex;">
            <img :src="modalBook.imageUrl" :alt="modalBook.title">
            <div
              class="modal-meta"
            >
              <h1>
                {{ modalBook.title }}
              </h1>
              <h2 class="modal-author">
                {{ modalBook.authors }}
              </h2>
              <p class="modal-date">
                {{ modalBook.datePublished }}
              </p>
            </div>
          </div>
          <p class="modal-desc">
            "{{ modalBook.desc }}"
          </p>
        </book-modal>
      </transition>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.library__wrapper {
  .library__header {
    color: black;
    margin: 10px;
  }

  .library__intro {
    margin: 10px;
    font-size: 13px;
    max-width: 65ch;
  }
  .library__books-wrapper {
    /* first breakpoint*/
    --w1:1200px;
    --n:5;
    /* second breakpoint*/
    --w2:768px;
    --m:4;
    /* third breakpoint*/
    --w3:400px;
    --p:2;
    margin: 2rem 2rem;

    display:grid;
    grid-template-columns:
    repeat(auto-fill,
    minmax(clamp(clamp(clamp(
            100%/(var(--n) + 1) + 0.1%,
              (var(--w1) - 100vw)*1000,
            100%/(var(--m) + 1) + 0.1%),
              (var(--w2) - 100vw)*1000,
            100%/(var(--p) + 1) + 0.1%),
              (var(--w3) - 100vw)*1000,
            100%), 1fr));
    gap: 20px;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

html.dark {
  .library__header {
    color: white;
  }
  .library__intro {
    color: white;
  }
  .modal-container {
    .modal-meta {
      h1 {
        color: white;
      }
      .modal-date {
        color: white;
      }
    }
    .modal-desc {
      color: white
    }
  }
}
</style>
