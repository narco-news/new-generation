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
  <div class="mail-icon-wrapper">
    <!-- REMIX -->
    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z" /></svg> -->
    <!-- EVA -->
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="email"><rect width="24" height="24" opacity="0" /><path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z" /></g></g></svg>
  </div>
</template>

<style lang="postcss" scoped>
.mail-icon-wrapper {
    display: grid;
    place-content: center;
    border-radius: 8px;
    box-shadow: v-bind(iconBoxShadow);
    transition: all 180ms ease-in;
    color: inherit;
    &:hover {
      color: inherit;
      box-shadow: 0 0 0 1px v-bind(HOVER_iconBoxShadow);
      border-color: transparent;
    }
    svg {
        width: 15px;
        height: 15px;
    }
}

html.dark {
  .mail-icon-wrapper {
    color: inherit;
    box-shadow: v-bind(iconBoxShadow);
  }
}
</style>
