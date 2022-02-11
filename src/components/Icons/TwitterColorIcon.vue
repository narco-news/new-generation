<script setup lang="ts">
const props = defineProps<{
  border?: boolean
}>()
const iconBoxShadow = ref()
const HOVER_iconBoxShadow = ref()
if (props.border === true) {
  iconBoxShadow.value = '0 0 0 1px var(--slate-400)'
  HOVER_iconBoxShadow.value = '0 0 0 2px var(--green)'
}
else {
  iconBoxShadow.value = 'none'
  HOVER_iconBoxShadow.value = 'none'
}
</script>

<template>
  <div class="twitter-icon-wrapper">
    <svg role="img" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
  </div>
</template>

<style lang="postcss" scoped>
.twitter-icon-wrapper {
    display: grid;
    place-content: center;
    border-radius: 8px;
    padding: 6px;
    margin: 0 5px;
    box-shadow: v-bind(iconBoxShadow);
    transition: all 180ms ease-in;
    color: inherit;
    &:hover {
      color: inherit;
      box-shadow: 0 0 0 1px v-bind(HOVER_iconBoxShadow);
      border-color: transparent;
    }
    svg {
        width: 18px;
        height: 18px;
    }
}

html.dark {
  .twitter-icon-wrapper {
    color: inherit;
    box-shadow: 0 0 0 1px var(--slate-600);
  }
}
</style>
