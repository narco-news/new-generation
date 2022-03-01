<script setup lang="ts">
import booksList from '../assets/book-list.json'
const { t } = useI18n({ useScope: 'global' })
useHead({
  title: 'Library',
  meta: [
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Library',
    },
    {
      hid: 'description',
      name: 'description',
      content: 'An aggregate of worthwhile on topics for further understanding',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'An aggregate of worthwhile on topics for further understanding',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'https://narco.news/library-meta-image.png',
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: 'narco.news',
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://narco.news/library',
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
})
const showModal = ref(false)
const modalData = ref()
function modal(book: object) {
  modalData.value = book
  showModal.value = true
}
tryOnMounted(() => {
  watchEffect(() => {
    if (showModal.value === true)
      document.body.classList.add('modal-open')
    else
      document.body.classList.remove('modal-open')
  })
})
const modalWrapper = ref(null)
onClickOutside(modalWrapper, () => {
  showModal.value = false
})
</script>

<template>
  <section class="library__wrapper">
    <!-- <h1 class="library__header">
      {{ t('nav.library') }}
    </h1> -->
    <div class="library__booklist-wrapper">
      <div
        v-for="book in booksList.books"
        :key="book.id"
      >
        <book-card
          :book="book"
          @open-modal="modal($event)"
        />
      </div>
    </div>
  </section>
  <the-modal
    v-if="showModal"
    @close-modal="showModal = false"
  >
    <div ref="modalWrapper" class="modal-wrapper">
      <button title="Close" alt="Close" class="modal__close-button" @click="showModal = false">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
      </button>
      <div class="modal-meta">
        <img
          :src="modalData.imageUrl"
          :alt="modalData.title"
          class="modal__image"
        >
        <div>
          <h2 class="modal__title">
            {{ modalData.title }}
          </h2>
          <p class="modal__author">
            {{ modalData.authors }}
          </p>
          <p class="modal__date">
            {{ modalData.datePublished }}
          </p>
        </div>
      </div>
      <p class="modal__desc">
        {{ modalData.desc }}
      </p>
    </div>
  </the-modal>
</template>

<style lang="postcss" scoped>
html.overflow-y-hidden {
  overflow-y: hidden;
}

::v-global(.g-dialog-frame) {
    @media (min-width: 641px) {
      width: 100%;
      display: grid;
      place-content: center;
    }
}
.modal-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 100%;
  border-radius: 6px;
  .modal-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    max-width: 65ch;
    margin: 0 auto;
    padding: 1.5rem clamp(1rem, 5%, 3rem);
    .modal__image {
      object-fit: contain;
      aspect-ratio: 1/1;
      max-height: 200px;
      width: 100%;
    }
    .modal__title {
      font-weight: 400;
      font-size: 22px;
    }
    .modal__author {
      color: var(--green);
      padding-right: 20px;
    }
    .modal__date {
      font-family: monospace;
    }
  }
  .modal__desc {
    font-style: italic;
    font-size: 13px;
    padding: 1.5rem clamp(1rem, 5%, 3rem);
    line-height: 1.5;
    max-width: 65ch;
    margin: 0 auto;
    margin-bottom: 2rem;
    overflow-y: scroll;
    max-height: 300px;
    &::before {
      content: '"';
    }
    &::after {
      content: '"';
    }
  }
  .modal__close-button {
    position: absolute;
    display: grid;
    place-content: center;
    top: 0;
    right: 0;
    padding: 10px;
    color: var(--slate-500);
    cursor: pointer;
    background: none;
    border: none;
    svg {
      display: grid;
      place-content: center;
      height: 15px;
      width: 15px;
    }
  }
}

.library__wrapper {
  margin: 0 1rem;
  margin-top: 2rem;
  .library__header {
    font-weight: 400;
    margin-bottom: 2rem;
  }
  .library__booklist-wrapper {
    --min: 20ch;
    --gap: 1rem;

    display: grid;
    grid-gap: var(--gap);
    /* min() with 100% prevents overflow
    in extra narrow spaces */
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  }
}

html.dark {
  .modal-wrapper {
    background-color: #161618;
    color: white;
  }
  .library__header {
    color: white;
  }
}
</style>
