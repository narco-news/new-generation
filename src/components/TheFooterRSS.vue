<script setup lang="ts">
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <a
    v-if="isLargeScreen"
    href="https://publish.narco.news/0ee142894f12535186d694ad21b2fb/rss/"
    target="_blank"
  >
    <div
      class="rss-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >&lt;!--!  Atomicons Free 1.00 by @atisalab License - https://atomicons.com/license/ (Icons: CC BY 4.0) Copyright 2021 Atomicons --&gt;<line
        x1="7"
        y1="18"
        x2="7.01"
        y2="18"
        stroke-linecap="round"
        stroke-width="2"
      /><path d="M7,12a6,6,0,0,1,6,6" /><path d="M7,6A12,12,0,0,1,19,18" /></svg>
    </div>
  </a>
</template>

<style lang="postcss" scoped>
a {
    align-self: flex-end;
    border-bottom: none !important;
    .rss-button {
    display: grid;
    place-content: center;
    background: none;
    padding: 5px;
    margin: 0.5rem 0;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 0 0 1px var(--slate-400);
    align-self: flex-end;
    transition: all 180ms ease-in;
    color: var(--slate-700);
        &:hover {
            box-shadow: 0 0 0 2px var(--green);
            color: var(--green);
        }
    }
}

html.dark {
    .rss-button {
        color: var(--slate-200);
        box-shadow: 0 0 0 1px var(--slate-500);
        &:hover {
            box-shadow: 0 0 0 2px var(--green-400);
            color: var(--green-400);
        }
    }
}
</style>
