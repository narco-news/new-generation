<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
import { Author } from '~/ghostTypes'
const useGhost = useGhostStore()
const props = defineProps<{
  author?: {}
}>()
const authorArticles = computed(() =>
  useGhost.listAuthorArticles(props.author?.slug).slice(0, 6),
)
const emits = defineEmits(['newSlug'])
</script>

<template>
  <section class="mfa-wrapper">
    <h1 class="mfa__header">
      More from
      <router-link
        :to="`/authors/${author?.slug}`"
      >
        {{ author?.name }}
      </router-link>
    </h1>
    <div class="mfa__articles-wrapper">
      <div
        v-for="article in authorArticles"
        :key="article.id"
        class="mfa__article-link"
        @click="$emit('newSlug', article?.slug, article?.title )"
      >
        <div class="icon">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 11L6 4L10.5 7.5L6 11Z" fill="currentColor" /></svg>
        </div>
        <h2>{{ article.title }}</h2>
      </div>
    </div>
    <div v-if="author?.facebook" class="support">
      <h1 class="mfa__header">
        Support {{ author?.name }}
      </h1>
      <a :href="`https://patreon.com/${author?.facebook}`" target="_blank" class="patreon-button">
        <svg width="15px" height="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 0H0V15H3V0Z" fill="currentColor" />
          <path d="M9.5 0C6.46243 0 4 2.46243 4 5.5C4 8.53757 6.46243 11 9.5 11C12.5376 11 15 8.53757 15 5.5C15 2.46243 12.5376 0 9.5 0Z" fill="currentColor" />
        </svg>
        Join Patreon
      </a>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.support {
  .patreon-button {
    text-decoration: none;
    background: #f96854;
    color: white;
    padding: 10px 20px;
    border-radius: 9999px;
    font-family: 'Oswald';
    font-weight: 400;
    margin: 0.5rem;
    display: inline-flex;
    align-items: center;
    svg {
      margin-right: 1rem;
    }
  }
}
.mfa-wrapper {
  background-color: var(--slate-200);
  padding: 1rem;
  border-top: 1px solid var(--green);
  border-bottom: 1px solid var(--green);
  margin: 2rem 0;
  @media (min-width: 1024px) {
    border-left: 1px solid var(--green);
    border-right: 1px solid var(--green);
    border-radius: 6px;
  }
  .mfa__header {
    color: var(--green);
    a {
      color: var(--green);
      /* border-bottom: 1px dotted var(--green); */
      /* text-decoration: none; */
      text-decoration-thickness: 2px;
      text-decoration-color: var(--green);
      text-decoration-style: dotted;

    }
  }
  .mfa__articles-wrapper {
    .mfa__article-link {
      color: var(--slate-800);
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-thickness: 1px;
      text-decoration-color: var(--slate-800);
      display: flex;
      cursor: pointer;
      .icon {
        color: var(--green);
        margin-top: 1.4rem;
        margin-right: 0.6rem;
      }
      h2 {
        font-weight: 400;
        align-self: flex-start;
      }
    }
  }
}

html.dark {
  .mfa-wrapper {
    color: white;
    background-color: #161618;
    .mfa__header {
      color: white;
    }
    .mfa__articles-wrapper {
      .mfa__article-link {
        color: var(--slate-200);
        h2 {
          border-color: white;
        }
      }
    }
  }
}
</style>
