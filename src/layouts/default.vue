<script lang="ts" setup>
</script>

<template>
  <header>
    <the-nav />
  </header>
  <main class="default-layout">
    <div class="page_wrapper">
      <router-view />
    </div>
  </main>
  <footer>
    <the-footer />
  </footer>
</template>

<style lang="postcss" scoped>
.default-layout {
  display: flex;
  justify-content: center;
  background-color: var(--slate-100);
  margin-top: 2em;
  margin-bottom: 18em;
  @media (max-width: 768px) {
    margin-top: 3em;
  }
  & .page_wrapper {
    width: 100%;
    max-width: 1140px;
  }
}

footer {
  margin: 0 auto;
}

html.dark {
  & .default-layout {
    background-color: #000000;
  }
}
</style>
