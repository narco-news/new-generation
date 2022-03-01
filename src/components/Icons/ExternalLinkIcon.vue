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
  <div class="external-link-icon">
    <!-- REMIX -->
    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" /></svg> -->
    <!-- Eva -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="external-link"><rect width="24" height="24" opacity="0" /><path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z" /><path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z" /></g></g></svg>
  </div>
</template>

<style lang="postcss" scoped>
.external-link-icon {
    display: grid;
    place-content: center;
    box-shadow: v-bind(iconBoxShadow);
    transition: all 180ms ease-in;
    color: inherit;
    padding: 0;
    margin: 0;
    &:hover {
      color: inherit;
      box-shadow: v-bind(HOVER_iconBoxShadow);
      border-color: transparent;
    }
    svg {
        width: 15px;
        height: 15px;
    }
}

html.dark {
  .external-link-icon {
    color: inherit;
    box-shadow: 0 0 0 1px v-bind(HOVER_iconBoxShadow);
  }
}
</style>
