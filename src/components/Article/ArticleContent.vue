<script setup lang="ts">
import reframe from 'reframe.js'
const props = defineProps<{
  content: string
}>()
onMounted(() => {
  reframe('iframe')
})
</script>
<template>
  <div class="article__content-wrapper">
    <div class="article__content" v-html="props.content" />
  </div>
</template>

<style lang="postcss" scoped>
.article__content-wrapper {
    padding: 0 1em;
    & .article__content {
      max-width: 85ch;
      margin: 0 auto;
    }

    & ::v-deep(.article__content) {
      font-family: 'Noto Serif';
      line-height: 1.5;

      a {
        color: var(--green);
        text-decoration: none;
        border-bottom: 1px dotted var(--green);
      }

      & p {
        margin: 1em auto;
        max-width: 65ch;
        font-size: clamp(100%, 1rem + 2vw, 18px);
      }

      img {
        object-fit: contain;
        width: 100%;
        height: auto;
        overflow: hidden;
        margin: 0.5em 0;
      }

      figcaption {
        font-size: 12px;
      }

      blockquote {
        font-style: italic;
      }
    }
  }

html.dark {
  .article__content-wrapper {

  & ::v-deep(.article__content) {
    color: white;

    & a {
      color: white;
    }
  }
  }
}
</style>
