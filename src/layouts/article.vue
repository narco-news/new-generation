<template>
  <main class="article-layout">
    <section class="article-layout__wrapper">
      <router-view />
    </section>
  </main>
  <footer>
    <the-footer />
  </footer>
</template>

<style lang="postcss" scoped>
.article-layout {
  margin: 0;
  padding: 0;
  display: grid;
  place-content: center;
  margin-bottom: 16rem;
  .article-layout__wrapper {
    position: relative;
    margin: 0;
    padding: 0;
    max-width: 1200px;
  }
}

html.dark {
  & .article-layout {
    background-color: #000000;
  }
}
</style>
