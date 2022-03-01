<script lang="ts" setup>
tryOnMounted(() => {
  const commentoScript = document.createElement('script')
  commentoScript.setAttribute('defer', '')
  commentoScript.setAttribute('src', 'https://comments.narco.news/js/commento.js')
  commentoScript.setAttribute('data-css-override', 'https://narco.news/comments.css')
  document.head.appendChild(commentoScript)
})
</script>

<template>
  <div class="comments-wrapper">
    <div id="commento" />
  </div>
</template>

<style lang="postcss" scoped>
.comments-wrapper {
  margin: 2rem 0 4rem 0;
}
</style>
