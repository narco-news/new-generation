<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main>
    <button
      @click="router.back()"
    >
      {{ t('nav.back') }}
    </button>
    <div class="page_wrapper">
      <router-view v-bind="$attrs" />
    </div>
  </main>
  <footer>
    <the-footer />
  </footer>
</template>

<style lang="postcss" scoped>
main {
  background-color: var(--slate-100);
  & .page_wrapper {
    display: flex;
    justify-content: center;
    border: 2px solid red;
    overflow: hidden;
  }
}
</style>
