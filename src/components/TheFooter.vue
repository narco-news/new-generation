<script setup lang="ts"></script>
<template>
  <footer class="footer">
    narco.news
  </footer>
</template>
<style lang="postcss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid black;
  height: 2rem;
  text-align: center;
}

html.dark {
  & .footer {
    background-color: #161618;
    border-top-color: white;
    color: white;
  }
}
</style>
