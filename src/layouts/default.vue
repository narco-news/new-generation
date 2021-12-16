<template>
  <header>
    <the-nav />
  </header>
  <main>
    <router-view v-bind="$attrs" />
  </main>
  <footer>
    <the-footer />
  </footer>
</template>
