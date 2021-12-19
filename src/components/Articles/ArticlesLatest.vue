<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const ghostStore = useGhostStore()
const latestArticles = computed(() => ghostStore.listLatestArticles(12))
</script>

<template>
  <h1>Latest Articles</h1>
  <div class="articles-latest">
    <div v-for="article in latestArticles" :key="article.slug" class="articles-wrapper">
      <articles-latest-article :article="article" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.articles-latest {
  color: black;
  padding: 5px;
  width: 100%;
  overflow: hidden;
  /* first breakpoint*/
  --w1:800px;
  --n:4;
  /* second breakpoint*/
  --w2:390px;
  --m:2;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(
      clamp(
        clamp(
          100%/ (var(--n) + 1) + 0.1%,
          (var(--w1) - 100vw) * 1000,
          100%/ (var(--m) + 1) + 0.1%
        ),
        (var(--w2) - 100vw) * 1000,
        100%
      ),
      1fr
    )
  );
  gap: 20px;

  & .articles-wrapper {
    &:nth-child(1) {
      grid-column: 1 / -1;
      ::v-deep(.article-latest) {
        position: relative;
        & .article-latest__meta {
          position: absolute;
          width: auto;
          bottom: 0;
          color: white;
          background-color: transparent;

          & .article-latest__title {
            color: white;
            background-color: transparent;
            font-size: 26px;
            font-weight: 600;
          }

          & .article-latest__tag {
            color: white;
            font-weight: 400;
            font-family: 'Oswald';
            font-size: 16px;
          }

          & .article-latest__excerpt-wrapper {
            background-color: transparent;
          }
          & .article-latest__excerpt {
            color: white;
            font-size: clamp(16px, calc(0.75rem + ((1vw - 3.2px) * 0.25)), 18px);
            font-weight: 400;
            font-family: 'Oswald';
          }

          & .article-latest__date-author-reading {
            color: white;
          }
        }
        & .article-latest__feature-image {
          height: 300px;
          border-radius: 8px;
          filter: blur(2px);
        }
      }
    }
    &:nth-child(5n) {
      /* grid-column: 1 / -1; */
      ::v-deep(.article-latest) {
        position: relative;
        border: 2px solid red;
        & .article-latest__meta {
          position: absolute;
          width: auto;
          bottom: 0;
          color: white;
          background-color: transparent;

          & .article-latest__title {
            color: white;
            background-color: transparent;
            font-size: 26px;
            font-weight: 600;
          }

          & .article-latest__tag {
            color: white;
            font-weight: 400;
            font-family: 'Oswald';
            font-size: 16px;
          }

          & .article-latest__excerpt-wrapper {
            background-color: transparent;
          }
          & .article-latest__excerpt {
            color: white;
            font-size: clamp(16px, calc(0.75rem + ((1vw - 3.2px) * 0.25)), 18px);
            font-weight: 400;
            font-family: 'Oswald';
          }
          & .article-latest__date-author-reading {
            color: white;
          }
        }
        & .article-latest__feature-image {
          height: 300px;
          border-radius: 8px;
          filter: blur(2px);
        }
      }
    }
    &:nth-child(10) {
      grid-column: span 2;
    }
  }
}

html.dark {
  & .articles-latest {
    background-color: lightcoral;
  }
}
</style>
