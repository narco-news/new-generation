<script setup lang="ts">
import { Articles } from '~/ghostTypes'
const props = defineProps<{
  articles: Articles
}>()
</script>

<template>
  <section class="pagination">
    <div class="pagination__wrapper">
      <article v-for="article in props.articles" :key="article.slug">
        <pagination-article :article="article" />
      </article>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.pagination {
  .pagination__wrapper {
    --w1: 1060px;
    --n: 3;
    /* second breakpoint*/
    --w2: 768px;
    --m: 2;
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
    gap: 10px;

    article {
      padding: 0.5rem;
      margin: 1rem;
      @media (min-width: 1060px) {
        margin: 1rem 0;
        &:nth-child(12n + 1) {
          grid-column: 1/-1;
          ::v-deep(.pa) {
            position: relative;
            .pa__image-wrapper {
              min-height: 450px;
            }
            .pa__meta {
              background-color: white;
              max-width: 75ch;
              position: absolute;
              bottom: 0;
              left: 0;
              border-top-right-radius: 6px;
              border-bottom-left-radius: 6px;
            }
          }
        }
        &:nth-child(12n) {
          width: 800px;
          ::v-deep(.pa) {
            .pa__meta {
              max-width: 600px;
              margin: 0 auto;
            }
            .pa__excerpt {
              width: 75%;
            }
          }
        }
      }

    }
  }
  .pagination__header {
    font-size: clamp(100%, 1rem + 2vw, 24px);
    font-family: var(--font-normal);
    font-weight: 400;
    margin-bottom: 0.5em;
    padding: 5px;
    background-color: var(--green);
    color: var(--slate-50);
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 100;
  }

  .load-more-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1em 0;
    padding: 1em 0;
    button {
      background: none;
      border: 1px solid black;
      border-radius: 9999px;
      padding: 1em 2em;
      font-weight: 600;
      &:hover {
        border: 1px solid var(--green);
        color: var(--green);
      }
    }
  }
}

html.dark {
  .pagination {
    .pagination__wrapper {
      article {
        &:nth-child(12n + 1) {
          ::v-deep(.pa) {
            box-shadow: none;
            .pa__meta {
              background-color: black;
              .pa__author-box {
                div {
                  time {
                    color: white;
                  }
                }
              }
              .pa__excerpt {
                color: white;
              }
            }
          }
        }
      }
    }
  }
}
</style>
