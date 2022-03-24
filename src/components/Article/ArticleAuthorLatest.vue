<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
import { Author } from '~/ghostTypes'
import articleVue from '~/layouts/article.vue'
const useGhost = useGhostStore()
defineEmits(['changeSlug'])
const props = defineProps<{
  author?: Author
  slug?: string
}>()
const authorArticles = computed(() =>
  useGhost.listAuthorArticles(props.author?.slug).slice(0, 4).filter(article => article.slug !== props.slug),
)
</script>

<template>
  <section class="mfa-wrapper">
    <div v-if="author?.facebook" class="fin-support-wrapper">
      <span>Enjoy the article? Learn something new?</span> Donations from readers like you allow me to invest more time into research and writing articles. Consider contributing a couple of dollars and funding independent drug war research. Thank you all for your support!
      <a
        href="https://buymeacoffee.com/elparece"
        target="_blank no-referer"
        class="coffee-button"
      >
        <img src="../../assets/buy-me-a-coffee-button.webp">
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
      :key="article.slug"
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
      <!-- <div v-if="author?.facebook" class="fin-support-wrapper">
        <a href="#" class="coffee-button">
          Hey, like what you read?
          <img src="../../assets/buy-me-a-coffee-button.webp">
        </a>
      </div> -->
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.coffee-button {
  display: block;
  margin: 1rem auto;
  margin-top: 3rem;
  color: var(--green);
  animation: float 4s infinite ease-in-out;
  img {
    display: block;
    margin: var(--space-m) auto;
    height: 50px;
    border-radius: 6px;
    box-shadow: 0 0 0 1px white;
    /* box-shadow:
      0 0 0 1px var(--green),
      0px 0.5px 0.6px hsl(var(--shadow-color) / 0.36),
      0px 1.7px 1.9px -0.8px hsl(var(--shadow-color) / 0.36),
      0px 4.2px 4.7px -1.7px hsl(var(--shadow-color) / 0.36),
      0.1px 10.2px 11.5px -2.5px hsl(var(--shadow-color) / 0.36); */
  }
}
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
    font-family: var(--font-normal);
    font-weight: 400;
    position: sticky;
    position: -webkit-sticky;
    z-index: 100;
    top: 0;
    padding: 1rem 0 0.5rem 0;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 2rem;
    max-width: 45ch;
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
  --shadow-color: 210deg 12% 60%;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: var(--step--1);
  line-height: 1.4;
  margin: 2rem var(--space-xs);
  padding: var(--space-xs);
  padding-top: var(--space-l);
  background-color: var(--green-100);
  border-radius: 4px;
  box-shadow:
    0 0 0 2px var(--green),
    0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);
  max-width: 45ch;
  span {
    font-weight: 600;
  }
  @media (min-width: 1140px) {
    margin: 2rem auto;
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
  font-family: var(--font-normal);
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
        color: var(--slate-800);
    }
  }
}

@keyframes float {
    0% {
      transform: translatey(0px);
      filter:
      drop-shadow(0 10px 10px rgba(0,0,0,0.2));
    }
    50% {
      filter:
        drop-shadow(0 15px 10px rgba(0,0,0,0.3));
      transform: translatey(-6px);
    }
    100% {
      filter:
        drop-shadow( 0 10px 10px rgba(0,0,0,0.2));
      transform: translatey(0px);
    }
  }
</style>
