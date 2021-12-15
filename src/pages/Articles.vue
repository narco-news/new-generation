<script setup lang="ts">
import { computed, ref } from 'vue'
import { ContentLoader } from 'vue-content-loader'
import dayjs from 'dayjs'
import { useGhostStore } from '~/stores/ghost'
// import { useTimeoutFn } from '@vueuse/core'
useHead({
  title: 'Articles',
})
// Declare store
const ghost = useGhostStore()
// Grab latest posts from the store
const latestPosts = computed(() => ghost.latestPosts)
// Check if article image has loaded
const isLoaded = ref(true)
const hiddenImage = ref(false)
const loaded = () => {
  // useTimeoutFn(() => {
  //     isLoaded.value = false
  //     hiddenImage.value = true
  // }, 2000)
  isLoaded.value = false
  hiddenImage.value = true
}
// Format date
function formatDate(date) {
  return dayjs(date).format('MMM. DD, YYYY')
}
</script>
<template>
  <h1>Articles</h1>
  <div class="article-wrapper">
    <article v-for="post in latestPosts" :key="post.slug" class="article">
      <content-loader
        v-show="isLoaded"
        viewBox="1 0 400 200"
        :speed="1"
        primary-color="#f3f3f3"
        secondary-color="#ecebeb"
      >
        <rect
          x="0"
          y="0"
          rx="0"
          ry="0"
          width="400"
          height="200"
        />
      </content-loader>
      <router-link :to="`/articles/${post.slug}`">
        <img
          v-show="hiddenImage"
          :src="post.feature_image"
          :alt="`Post: ${post.title}`"
          :title="`Post: ${post.title}`"
          class="article__image"
          @load="loaded"
        >
      </router-link>
      <div class="article__meta">
        <div class="article__tags-box">
          <router-link
            v-for="tag in post.tags.slice(0, 2)"
            :key="tag.slug"
            :to="`/tags/${tag.slug}`"
            class="article__tag"
          >
            {{ tag.name }}
          </router-link>
        </div>
        <router-link :to="`/articles/${post.slug}`">
          <h1 class="article__title">
            {{ post.title }}
          </h1>
        </router-link>
        <div class="article__author-box">
          <img :src="post.primary_author.profile_image" class="article__author-image">
          <router-link
            :to="`/author/${post.primary_author.slug}`"
            class="article__author-name"
          >
            {{ post.primary_author.name }}
          </router-link>
          <div class="article__author-date-time">
            <time class="article__author-date">{{ formatDate(post.published_at) }}</time>
            <span>&nbsp;·&nbsp;</span>
            <p class="article__author-reading-time">
              {{ post.reading_time }} mins
            </p>
          </div>
        </div>
        <p>
          {{
            post.excerpt
          }}
        </p>
      </div>
    </article>
  </div>
</template>

<style lang="postcss" scoped>
.article-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2em;
    padding: 1em;
    margin: 0 1em;
    & .article {
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        &:nth-child(1) {
            grid-column: 1 / span 3;
            & .article__image {
                max-height: 300px;
            }
        }
        & .article__image {
            max-height: 200px;
            width: 100%;
            object-fit: cover;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        & .article__meta {
            margin-top: 1em;
            padding: 0 2em;
            @media (max-width: 768px) {
                padding: 0 1em;
            }
            & .article__title {
                font-family: serif;
            }

            & .article__tags-box {
                & .article__tag {
                    margin: 0 0.5em;

                    &:nth-child(1) {
                        font-weight: 600;
                    }
                }
            }

            & .article__author-box {
                & .article__author-image {
                    height: 45px;
                    width: 45px;
                    border-radius: 100%;
                    filter: grayscale(100%);
                    transition: filter 0.3s ease-in-out;
                    margin-right: 1em;
                    float: left;
                    &:hover {
                        filter: grayscale(0);
                    }
                }
                & .article__author-name {
                    font-size: large;
                }

                & .article__author-date-time {
                    display: flex;
                    align-items: center;
                    font-size: small;
                    & .article__author-date {
                    }
                    & .article__author-reading-time {
                        font-family: monospace;
                    }
                }
            }
        }

        & a {
            text-decoration: none;
            color: blue;
        }
    }
    /* Mobile styles */
    @media (max-width: 425px) {
        grid-template-columns: 1fr;
        & .article {
            &:nth-child(1) {
                grid-column: auto;
            }
        }
    }
}

html.dark {
    & .article {
        background-color: #161618;
        color: white;

        & a {
            color: lightskyblue;
        }
    }
}
</style>
