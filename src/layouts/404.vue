<script setup lang="ts">
import { useRouter } from 'vue-router'
// import { useI18n } from 'vue-i18n'
const router = useRouter()
// const { t } = useI18n()
</script>

<template>
  <main>
    <router-view v-bind="$attrs" />
    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        <!-- {{ t('button.back') }} -->
        Back
      </button>
    </div>
  </main>
</template>
