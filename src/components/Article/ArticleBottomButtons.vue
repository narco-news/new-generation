<script setup lang="ts">
import { Article } from '~/ghostTypes'
const props = defineProps<{
  article?: Article
}>()
const source = ref(`https://narco.news/articles/${props.article?.slug}`)
const options = {
  copiedDuring: 3000,
  source: source.value,
}
const { copy, copied } = useClipboard(options)

const buttonBoxShadow = ref('0 0 0 1px var(--slate-300)')
function clicked() {
  copy()
  buttonBoxShadow.value = '0 0 0 2px var(--green-400)'
  useTimeoutFn(() => {
    buttonBoxShadow.value = '0 0 0 1px var(--slate-300)'
  }, 3000)
}
</script>

<template>
  <div class="bottom-share-buttons">
    <div
      style="display: flex;align-items:center"
    >
      <a
        :href="`https://twitter.com/share?text=&quot;${props.article.title}&quot;&url=https://narco.news/articles/${props.article.slug}`"
        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
        target="_blank"
        class="icon"
      >
        <twitter-color-icon :border="false" />
      </a>
      <a
        :href="`https://www.facebook.com/sharer.php?u=https://narco.news/articles/${props.article.slug}`"
        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
        target="_blank"
        class="icon"
      >
        <facebook-icon />
      </a>
      <button
        class="copy-icon"
        @click="clicked()"
      >
        <check-icon v-if="copied" style="color:var(--green-400)" />
        <share-link-icon v-else />
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.bottom-share-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3rem 0;
    margin-top: 5rem;
    padding: 0 1rem;
    .icon {
        color: var(--green);
        background: none;
        border: none;
        display: grid;
        place-content: center;
        border-radius: 100%;
        box-shadow: 0 0 0 1px var(--slate-300);
        margin: 0 0.5rem;
        padding: 10px;
        transition: all 180ms ease-in-out;
        &:hover {
            color: var(--green);
            box-shadow: 0 0 0 2px var(--green);
        }
        svg {
            width: 15px !important;
            height: 15px !important;
            padding: 0 !important;
            margin: 0 !important;

            @media(min-width: 768px) {
                width: 20px;
                height: 20px;
            }
        }
    }
    .copy-icon {
        color: var(--green);
        background: none;
        border: none;
        display: grid;
        place-content: center;
        border-radius: 100%;
        box-shadow: v-bind(buttonBoxShadow);
        margin: 0 0.5rem;
        padding: 10px;
        transition: all 180ms ease-in-out;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        &:hover {
            color: var(--green);
            box-shadow: 0 0 0 2px var(--green);
        }
        svg {
            width: 15px;
            height: 15px;
            @media(min-width: 768px) {
                width: 20px;
                height: 20px;
            }
        }
    }
}

html.dark {
    .bottom-share-buttons {
        .icon {
            color: white;
            &:hover {
                color: var(--green-400);
                box-shadow: 0 0 0 2px var(--green-400);
            }
        }
        .copy-icon {
            color: white;
        }
    }
}
</style>
