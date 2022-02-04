<script setup lang="ts">
import formatDate from '~/composables/formatDate'
const props = defineProps<{
  article: {}
}>()
const articleEl = ref()
const TextHoverDecoration = ref('none')
const articleHovered = useElementHover(articleEl)
watchEffect(() => {
  if (articleHovered.value === true)
    TextHoverDecoration.value = 'underline'
  else
    TextHoverDecoration.value = 'none'
})
</script>

<template>
  <router-link
    :to="`/articles/${props.article.slug}`"
    class="hvr-float"
  >
    <article ref="articleEl" class="article__article">
      <img
        :src="props.article.feature_image"
        :alt="props.article.title"
        class="article__feature-image"
      >
      <div class="article__meta">
        <div class="article__tags-wrapper">
          <p
            v-for="tag in props.article.tags.slice(0, 2)"
            :key="tag.slug"
            class="article__tag"
          >
            {{ tag.name }}
          </p>
        </div>
        <h3 class="article__title line-clamp-three">
          {{ props.article.title }}
        </h3>
        <div class="article__date-author-wrapper">
          <p class="article__author">
            {{ props.article.primary_author.name }}&nbsp;
          </p>
          –
          <p class="article__date">
            &nbsp;{{ formatDate(props.article.published_at) }}
          </p>
        </div>
        <div class="article__excerpt-wrapper line-clamp">
          <p class="article__excerpt">
            {{ props.article.custom_excerpt }}
          </p>
        </div>
      </div>
    </article>
  </router-link>
</template>

<style lang="postcss" scoped>
a {
    text-decoration: none;
    border: 1px solid var(--slate-300);
    border-radius: 6px;
    overflow: hidden;
    background: white;
    height: 100%;
    width: 100%;
    /* transition: box-shadow 180ms ease-in-out; */
    &:hover {
        box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
        border: 1px solid var(--green);
    }
}
.article__article {
    /* IMAGE */
    .article__feature-image {
        max-height: 250px;
        aspect-ratio: 1/1;
        object-fit: cover;
        width: 100%
    }

    /* META WRAPPER */
    .article__meta {
        padding: 0.5rem;
    }
    /* TAGS */
    .article__tags-wrapper {
        display: flex;
        .article__tag {
            font-size: 12px;
            color: var(--slate-600);
            margin-right: 0.5rem;
        }
    }
    /* TITLE */
    .article__title {
        color: black;
        margin: 0;
        padding: 0;
        font-size: clamp(100%, 1rem + 2vw, 24px);
        text-decoration: v-bind('TextHoverDecoration');
    }
    /* AUTHOR DATE */
    .article__date-author-wrapper {
        display: flex;
        align-items: baseline;
        color: var(--slate-600);
        .article__author {
            font-weight: 500;
            color: var(--green);
            font-family: 'Oswald';
            font-weight: 400;
            font-size: clamp(100%, 0.5rem + 2vw, 18px);
        }
        .article__date {
          font-family: monospace;
          font-size: 13px;
        }
    }
    /* EXCERPT */
    .article__excerpt {
        font-size: 13px;
        font-family: sans-serif;
        color: var(--slate-600);
        margin: 0;
        margin-bottom: 0.5rem;
    }
}

html.dark {
    a {
        background-color: #161618;
        border-color: var(--slate-700);
        &:hover {
          border-color: var(--lt-green);
        }
    }
    .article__tags-wrapper {
        .article__tag {
            color: var(--slate-500);
        }
    }
    .article__date-author-wrapper {
        color: var(--slate-500);
    }
    .article__excerpt {
        color: var(--slate-500);
    }
    .article__title {
        color: white;
    }
    .article__author {
      color: var(--lt-green);
    }
}
</style>
