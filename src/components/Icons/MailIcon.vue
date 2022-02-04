<template>
  <div class="mail-icon-wrapper">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  </div>
</template>

<style lang="postcss" scoped>
.mail-icon-wrapper {
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
  .mail-icon-wrapper {
    color: white;
    border-color: white;
  }
}
</style>
