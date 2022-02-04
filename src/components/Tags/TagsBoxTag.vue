<script setup lang="ts">
import { useGhostStore } from '~/stores/ghost'
const ghost = useGhostStore()
const props = defineProps<{
  name?: string
  slug: string
  count: number
}>()
interface Style {
  background: string
}
interface TagElement {
  style: Style
}
function selectTag(tagElement: TagElement, tagSlug: string) {
  if (tagElement.style.background === 'crimson') {
    ghost.removeSelectedtag(tagSlug)
    tagElement.style.background = 'none'
  }
  else {
    ghost.addSelectedTag(tagSlug)
    return tagElement.style.background = 'crimson'
  }
}
</script>
<template>
  <button ref="button" class="tag" @click="selectTag($refs.button, props.slug )">
    {{ props.name }}
    <span class="post-count">
      ({{ props.count }})
    </span>
  </button>
</template>
<style lang="postcss" scoped>
.tag {
  background: none;
  border: 1px solid black;
  border-radius: 9999px;
  outline: 2px solid transparent;
  font-size: small;
  padding: 1em 2em;
  transition: border 0.3s ease-out;
  transition: outline 0.3s ease-in-out;
  &:hover {
    border-color: transparent;
    outline-color: crimson;
  }

  & .post-count {
    font-weight: 600;
    font-family: monospace;
    font-size: medium;
  }

  /* Mobile styles */
  @media (max-width: 425px) {
    font-size: 11px;
    padding: 0 1em;
    & .post-count {
      font-size: small;
    }
  }
  /* Tablet styles */
  @media (max-width: 1024px) {
    font-size: medium;
    padding: 0.5em 1em;
  }
}
/* Dark mode styles */
html.dark {
  .tag {
    background-color: #212124;
    border-color: white;
    color: white;
    transition: border 0.2s ease-in-out;
    transition: outline 0.3s ease-in-out;
    &:hover {
      border-color: transparent;
      outline-color: crimson;
    }
    /* &:focus {
      outline-color: crimson;
    } */
  }
}
</style>
