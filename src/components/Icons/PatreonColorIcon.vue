<template>
  <div class="patreon-icon-wrapper">
    <svg width="15px" height="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 0H0V15H3V0Z" fill="currentColor" />
      <path d="M9.5 0C6.46243 0 4 2.46243 4 5.5C4 8.53757 6.46243 11 9.5 11C12.5376 11 15 8.53757 15 5.5C15 2.46243 12.5376 0 9.5 0Z" fill="currentColor" />
    </svg>
    <span style="margin-left: 5px;text-decoration: none;white-space: nowrap;">
      Join Patreon
    </span>
  </div>
</template>

<style lang="postcss" scoped>
.patreon-icon-wrapper {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    color: var(--slate-50);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 14px;
    font-weight: 600;
    background-color: rgb(255, 66, 77);
    svg {
        width: 18px;
        height: 18px;
    }
}
html.dark {
  .patreon-icon-wrapper {
    box-shadow: 0 0 0 1px var(--slate-50);
  }
}
</style>
