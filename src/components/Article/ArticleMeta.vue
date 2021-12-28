<script setup lang="ts">
import Popper from 'vue3-popper'
import formatDate from '~/composables/formatDate'
const emits = defineEmits(['titleVisible'])
const props = defineProps<{
  title: string
  tags: []
  primaryAuthor: {}
  publishedAt: string
  readingTime: number
}>()
const articleTitle = ref()
const isTitleVisible = useElementVisibility(articleTitle)
watchEffect(() => {
  if (isTitleVisible.value === false)
    emits('titleVisible', false)
  else
    emits('titleVisible', true)
})
</script>
<template>
  <div class="article__meta">
    <div class="article-meta__tags">
      <router-link v-for="tag in props.tags.slice(0, 3)" :key="tag.id" :to="`/tags/${tag.slug}`" class="article-meta__tag">
        #{{ tag.slug }}
      </router-link>
    </div>
    <h1 ref="articleTitle" class="article-meta__title">
      {{ props.title }}
    </h1>
    <div class="article-meta__author-date-reading">
      <div class="article-meta__author">
        <ClientOnly>
          <Popper>
            <button class="popper-button">
              {{ props.primaryAuthor.name }}
            </button>
            <template #content>
              <div class="article-meta__author-popup">
                <img :src="props.primaryAuthor.profile_image" class="article-meta__author-image">
                <router-link :to="`/authors/${props.primaryAuthor.slug}`" class="article-meta__author-name">
                  {{ props.primaryAuthor.name }}
                </router-link>
                <div class="article-meta__post-count">
                  XX Posts
                </div>
                <div class="article-meta__social-icons">
                  <router-link v-if="props.primaryAuthor.twitter" :to="`https://twitter.com/${props.primaryAuthor.twitter}`">
                    <!-- <img src="../../assets/twitter.svg" style="width: 20px;height:20px;"> -->
                  </router-link>
                </div>
              </div>
            </template>
          </Popper>
        </ClientOnly>
      </div>
      <div class="article-meta__date">
        {{ formatDate(props.publishedAt, 'MMM DD, YYYY') }}
      </div>
      <div class="article-meta__reading-time">
        {{ props.readingTime }} minutes
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.popper-button {
  background: none;
  border: none;
  display: grid;
  place-content: center;
  margin-right: 1em;
  padding: 0;
  color: var(--slate-600);
  border-bottom: 1px dotted var(--slate-500);
}
.article__meta {
  /*  */
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1em;
  & .article-meta__title {
    margin: 0;
    padding: 0.3em 0;
    font-size: clamp(100%, 1rem + 2vw, 56px);
  }

  & .article-meta__tags {
    /*  */
    display: flex;
    flex-wrap: none;
    & .article-meta__tag {
      /*  */
      display: inline-flex;
      text-decoration: none;
      border-bottom: 1px dotted var(--slate-600);
      margin-right: 1em;
      font-family: monospace;
      font-size: 12px;
      color: var(--slate-600);
      padding-bottom: 2px;
      &:nth-child(1) {
        color: var(--green);
        border-bottom: 1px dotted var(--green);
      }
    }
  }

  & .article-meta__author-date-reading {
    display: flex;
    align-items: center;
    flex-wrap: none;
    & .article-meta__author {
      color: var(--slate-600);
      text-decoration: none;
      margin-right: 1em;

      & .article-meta__author-popup {
        background-color: white;
        border: 1px solid var(--slate-400);
        border-radius: 6px;
        padding: 0.6em 1em 0 1em;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        background-color: rgba(255, 255, 255, 0.404);
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);

        & .article-meta__author-image {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          float: left;
          margin-right: 1.5em;
        }

        & .article-meta__post-count {
          font-weight: 600;
          margin-top: 0.5em;
        }

        & .article-meta__social-icons {
          margin-top: 0.5em;
          & a {
            border: none;
          }
        }

        & a {
          color: var(--slate-600);
          text-decoration: none;
          border-bottom: 2px dotted var(--slate-600);
        }
      }
    }

    & .article-meta__date {
      color: var(--slate-600);
      margin-right: 1em;
    }
    & .article-meta__reading-time {
      color: var(--slate-600);
    }
  }
}

html.dark {

  .popper-button {
    color: white;
  }
  & .article__meta {
    color: white;

    & .article-meta__tags {
      & .article-meta__tag {
        color: var(--slate-300);
        border-bottom: 2px dotted var(--slate-300);
        &:nth-child(1) {
          color: var(--green);
          border-bottom: 2px dotted var(--green);
        }
      }
    }

    & .article-meta__author-date-reading {
      & .article-meta__author>a {
        color: var(--slate-100);
        border-bottom-color: var(--slate-100);
      }

      & .article-meta__date {
        color: var(--slate-300);
      }
      & .article-meta__reading-time {
        color: var(--slate-300);
      }
    }
  }
}
</style>
