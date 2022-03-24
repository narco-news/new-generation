<script setup lang="ts">
import { Author, Articles } from '~/ghostTypes'
import { useGhostStore } from '~/stores/ghost'
import formatDate from '~/composables/formatDate'
const props = defineProps<{
  author: Author
  showArticles: boolean
}>()
const useGhost = useGhostStore()
const authorArticles = computed((): Articles => useGhost.listAuthorArticles(props.author.slug))
</script>

<template>
  <div class="author">
    <router-link :to="`/authors/${props.author.slug}`">
      <img :src="props.author.profile_image" :alt="props.author.name">
    </router-link>
    <router-link :to="`/authors/${props.author.slug}`">
      <h2 class="author__name">
        {{ props.author.name }}
      </h2>
    </router-link>
    <p class="author__post-count">
      {{ props.author.count?.posts }} articles
    </p>
    <p class="author__bio">
      {{ props.author.bio }}
    </p>
    <!-- Articles -->
    <ul v-if="props.showArticles" class="author__latest-articles">
      <li v-for="article in authorArticles.slice(0, 4)" :key="article.slug">
        <router-link :to="`/articles/${article.slug}`">
          <span class="article-dot" />
          <span class="article-date">{{ formatDate(article.published_at, 'MMM D') }} – </span>
          <span class="article-title">{{ article.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
a {
    color: black;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
}
.author {
    --w: 450px;
    --c: (100vw - var(--w));
    max-width: 500px;
    background: white;
    border: 1px solid var(--slate-500);
    margin: 20px auto;
    border-radius: 10px;
    overflow: hidden;
    padding: 0 20px 0 clamp(20px, var(--c) * 1000, 180px);
    box-sizing: border-box;
    position: relative;
    @media (max-width: 425px) {
      margin: 10px 20px 1rem 20px;
    }

    img {
        position: absolute;
        top: clamp(0px, var(--c) * -1000, 25px);
        left: clamp(0px, var(--c) * -1000, 20px);
        width: clamp(50px, var(--c) * 1000, 150px);
        height: clamp(50px, var(--c) * 1000, 100%);
        border-radius: clamp(0px, var(--c) * -1000, 50px);
        object-fit: cover;
        object-position: top;
        box-shadow: 0 0 0 2px var(--green);
    }

    .author__name {
        font-family: var(--font-title);
        margin: 20px 0 10px clamp(0px, var(--c) * -1000, 70px);
        color: black;
        text-decoration: none;
    }

    .author__bio {
        font-size: 13px;
        color: var(--slate-600);
        cursor: none;
        user-select: none;
    }

    .author__post-count {
        margin: 20px 0 10px clamp(0px, var(--c) * -1000, 70px);
        color: var(--green);
        font-weight: 500;
        font-family: var(--font-normal);
        cursor: none;
        user-select: none;
    }

    .social-links {
        display: flex;
        padding: 0;
        margin: 20px 0;
        height: auto;
        & a:hover {
          color: var(--green) !important;
        }
    }

    .author__latest-articles {
        margin: 10px 0;
        padding: 0;
        list-style: none;

        li {
            color: var(--slate-600);
            font-weight: 500;
            display: -webkit-box;
            -webkit-line-clamp: var(--line-clamp, 2);
            -webkit-box-orient: vertical;
            word-break: var(--word-break, 'none');
            overflow: hidden;
            padding-top: 10px;

            a {
                text-decoration: none;
            }
            .article-title {
                &:hover {
                    text-decoration: underline;
                }
            }
            .article-date {
                color: var(--slate-500);
                text-decoration: none;
                font-size: 12px;
            }
        }
    }
}

html.dark {
  .author {
    background-color: #161618;
    border-color: var(--slate-500);
    color: white;
    .author__name {
      color: white;
    }
    .author__bio {
      color: var(--slate-400);
    }
    .social-links {
      a {
        color: white !important;
      }
    }
  }
}
</style>
