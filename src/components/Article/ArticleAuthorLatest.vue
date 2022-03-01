<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
import { Author } from '~/ghostTypes'
import formatDate from '~/composables/formatDate'
const useGhost = useGhostStore()
defineEmits(['changeSlug'])
const props = defineProps<{
  author?: Author
}>()
const authorArticles = computed(() =>
  useGhost.listAuthorArticles(props.author?.slug).slice(0, 6),
)
</script>

<template>
  <section class="mfa-wrapper">
    <div v-if="author?.facebook" class="fin-support-wrapper">
      <p class="fin-support__pretext">
        Support {{ author?.name }} on
      </p>
      <a :href="`https://patreon.com/${author?.facebook}`" target="_blank" class="patreon-button">
        <svg width="15px" height="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 0H0V15H3V0Z" fill="currentColor" />
          <path d="M9.5 0C6.46243 0 4 2.46243 4 5.5C4 8.53757 6.46243 11 9.5 11C12.5376 11 15 8.53757 15 5.5C15 2.46243 12.5376 0 9.5 0Z" fill="currentColor" />
        </svg>
        Patreon
      </a>
    </div>
    <h1 class="mfa-wrapper__header">
      Read more from
      <router-link
        :to="`/authors/${author?.slug}`"
      >
        {{ author?.name }}
      </router-link>
    </h1>
    <!-- ARTICLES BEGIN -->
    <div
      v-for="article in authorArticles"
      :key="article.key"
      class="author-articles-wrapper"
    >
      <article-author-latest-article
        :article="article"
        @change-slug="$emit('changeSlug', $event)"
      />
    </div>
    <!-- ARTICLES END -->
    <!-- MORE ARTICLES LINK -->
    <router-link
      :to="`/authors/${author.slug}`"
      class="more-articles-link"
    >
      THE REST
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z" /><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" /></svg>
    </router-link>
    <div>
      <!--  -->
      <div v-if="author?.facebook" class="fin-support-wrapper">
        <p class="fin-support__pretext">
          Support {{ author?.name }} on
        </p>
        <a :href="`https://patreon.com/${author?.facebook}`" target="_blank" class="patreon-button">
          <svg width="15px" height="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 0H0V15H3V0Z" fill="currentColor" />
            <path d="M9.5 0C6.46243 0 4 2.46243 4 5.5C4 8.53757 6.46243 11 9.5 11C12.5376 11 15 8.53757 15 5.5C15 2.46243 12.5376 0 9.5 0Z" fill="currentColor" />
          </svg>
          Patreon
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.mfa-wrapper {
  margin: 2rem 0;
  padding: 1rem;
  background-color: white;
  @media(min-width: 992px) {
    border-radius: 12px;
  }
  .mfa-wrapper__header {
    background-color: white;
    border-bottom: 2px solid var(--green);
    color: var(--green);
    font-size: clamp(100%, 0.9rem + 2vw, 2rem);
    font-family: 'Quicksand';
    font-weight: 400;
    position: sticky;
    position: -webkit-sticky;
    z-index: 100;
    top: 0;
    padding: 1rem 0 0.5rem 0;
    margin-top: 1rem;
    margin-bottom: 2rem;
    a {
      color: var(--green);
      text-decoration: none;
      font-weight: 600;
    }
  }
  & .author-articles-wrapper {
    max-width: 80ch;
    margin: 0 auto;
  }
}
.fin-support-wrapper {
  border-bottom: 1px solid var(--green-200);
  border-top: 1px solid var(--green-200);
  margin: 2rem 0.5rem;
  .fin-support__pretext {
    display: inline-flex;
    font-weight: 600;
    color: var(--slate-700);
    font-size: 18px;
    font-family: monospace;
    margin-right: 0.5rem;
  }
  .patreon-button {
    text-decoration: none;
    background: #f96854;
    color: white;
    padding: 10px 20px;
    border-radius: 9999px;
    font-family: 'Oswald';
    font-weight: 500;
    margin: 2rem 0.5rem 2rem 0.5rem;
    display: inline-flex;
    align-items: center;
    svg {
      margin-right: 1rem;
    }
  }
}
.divider {
  background-color: var(--green-400);
  border: none;
  height: 2px;
  margin: 0;
  padding: 0;
  margin-top: 5rem;
  @media (min-width: 1040px) {
    display: none;
  }
}

.more-articles-link {
  color: inherit;
  text-decoration: none;
  padding-bottom: 5px;
  font-family: 'Quicksand';
  font-weight: 600;
  display: inline-flex;
  margin: 0 0.5rem;
  /* margin-bottom: 2rem; */
  svg {
    margin-left : 5px;
  }
    background:
    linear-gradient(
      to right,
      var(--slate-800),
      var(--slate-800)
    ),
    linear-gradient(
      to right,
      rgb(233, 45, 20),
      rgb(241, 166, 25),
      rgb(249, 253, 5)
  );
  background-size: 100% 2px, 0 2px;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 400ms;
  &:hover {
      background-size: 0 2px, 100% 2px;
  }
  @media (min-width: 994px) {
    margin: 2rem 7rem;
  }
}

html.dark {
  .mfa-wrapper {
    color: white;
    background-color: black;
    .mfa-wrapper__header {
      background-color: black;
    }
    .mfa__articles-wrapper {
      .mfa__article-link {
        color: var(--slate-200);
        h2 {
          border-color: white;
        }
      }
    }
    .more-articles-link {
      color: var(--slate-300);
      border-bottom: 2px solid var(--slate-300);
    }
    .fin-support-wrapper {
      .fin-support__pretext {
        color: white;
      }
    }
  }
}
</style>
