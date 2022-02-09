<script setup lang="ts">
import { Articles } from '~/ghostTypes'
const props = defineProps<{
  heading: string
  moreButton: string
  slug: string
  articles: Articles
  showImage?: boolean
}>()
const boxHeadingBar = ref()
</script>

<template>
  <section
    class="box__wrapper"
  >
    <div
      ref="boxHeadingBar"
      class="box__heading-bar"
    >
      <h1 class="box__heading">
        {{ props.heading }}
      </h1>
      <router-link
        :to="`/tags/${props.slug}`"
        class="box__more-link"
      >
        MORE {{ props.moreButton }}
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
      </router-link>
    </div>
    <div class="box__articles-wrapper">
      <div
        v-for="article in props.articles"
        :key="article.slug"
        class="box__article"
      >
        <latest-box-article
          :article="article"
          :show-image="props.showImage"
        />
      </div>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.box__wrapper {
  margin: 1rem 0.5rem;
  border-bottom: 3px solid var(--green-400);
    .box__heading-bar {
        margin-bottom: 2rem;
        padding: 1rem 0.5rem 0.5rem 1rem;
        background-color: var(--slate-100);
        border-bottom: 2px solid var(--slate-700);
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        .box__heading {
            color: var(--slate-700);
            font-weight: 400;
            font-size: clamp(100%, 1.5rem + 2vw, 28px);
            margin: 0;
            padding: 0;
        }
        .box__more-link {
            color: var(--slate-600);
            font-size: 12px;
            text-decoration: none;
            font-family: monospace;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            -webkit-tap-highlight-color: none;
            border-radius: 6px;
            transition: all 180ms ease-in;
            text-transform: uppercase;
            &:hover {
                box-shadow: 0 0 0 1px var(--green);
                color: var(--green);
            }
        }
    }
    .box__articles-wrapper {
        .box__article {
            &:last-child {
                ::v-deep(.article) {
                    .meta {
                        border: none;
                    }
                }
            }
        }
    }
}

html.dark {
    .box__wrapper {
        .box__heading-bar {
            background-color: black;
            border-color: var(--slate-300);
            .box__heading {
                color: white;
            }
            .box__more-link {
                color: white;
                &:hover {
                    color: var(--green);
                }
            }
        }
    }
}
</style>
