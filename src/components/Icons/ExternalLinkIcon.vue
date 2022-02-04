<template>
  <div class="external-link-icon">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
  </div>
</template>

<style lang="postcss" scoped>
.external-link-icon {
    display: grid;
    place-content: center;
    border: 1px solid black;
    border-radius: 8px;
    padding: 6px;
    margin: 0 5px;
    &:hover {
      box-shadow: 0 0 0 1px var(--green);
      border-color: transparent;
    }
    svg {
        width: 18px;
        height: 18px;
    }
}

html.dark {
  .external-link-icon {
    color: white;
    border-color: white;
  }
}
</style>
