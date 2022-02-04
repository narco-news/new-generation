<script setup lang="ts">
withDefaults(defineProps<{
  minHeight?: string
}>(), {
  minHeight: '275px',
})
</script>

<template>
  <div class="image-loader__wrapper">
    <h1>narco.news</h1>
  </div>
</template>

<style lang="postcss" scoped>
.image-loader__wrapper {
    background-color: var(--slate-100);
    display: grid;
    place-content: center;
    overflow: hidden;
    width: auto;
    min-height: v-bind('$props.minHeight');
    h1 {
        margin: 0;
        padding: 0;
        font-weight: 400;
        font-size: 24px;
        color: var(--slate-300);
        -moz-transition:all 0.5s ease-in-out;
        -webkit-transition:all 0.5s ease-in-out;
        -o-transition:all 0.5s ease-in-out;
        -ms-transition:all 0.5s ease-in-out;
        transition:all 0.5s ease-in-out;
        -moz-animation:blink normal 2s infinite ease-in-out;
        /* Firefox */
        -webkit-animation:blink normal 2s infinite ease-in-out;
        /* Webkit */
        -ms-animation:blink normal 2s infinite ease-in-out;
        /* IE */
        animation:blink normal 2s infinite ease-in-out;
        /* Opera */
    }
    @media (min-width: 768px) {
      margin: 1rem;
      padding: 1rem;
      /* border: 1px solid var(--slate-300); */
      border-radius: 8px;
  }
}

html.dark {
    .image-loader__wrapper {
        background-color: black;
        h1 {
            color: var(--slate-800);
        }
        @media (min-width: 768px) {
          /* border: 1px solid var(--slate-800); */
        }
    }
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}
</style>
