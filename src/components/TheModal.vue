<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
defineEmits(['closeModal'])
const myModal = ref<HTMLElement>()
const variants = ref<MotionVariants>({
  initial: {
    opacity: 0,
    y: 100,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      striffness: '80',
    },
  },
  leave: {
    y: -100,
  },
})

const motionInstance = useMotion(myModal, variants)
</script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <!-- <button class="modal-close-button" @click="$emit('closeModal')">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" /></svg>
      </button> -->
      <div ref="myModal" class="modal-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.modal-mask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(7px);
    display: grid;
    place-content: center;
    @supports not (backdrop-filter: blur(7px)) {
        background-color: rgba(180, 179, 179, 0.8);
    }
    .modal-wrapper {
        width: 100vw;
        height: 100vh;
        position: relative;
        display: grid;
        place-content: center;
        padding: 1rem;
        .modal-close-button {
            display: grid;
            place-content: center;
            position: absolute;
            top: 0;
            right: 0;
            margin: 20px;
            background-color: var(--slate-300);
            border: 1px solid var(--slate-400);
            border-radius: 100%;
            padding: 0.5rem;
            color: var(--slate-500);
        }
        .modal-container {
            position: relative;
            width: auto;
            height: auto;
            overflow: hidden;
            background-color: white;
            /* border: 2px solid var(--slate-500); */
            /* overflow-y: scroll; */
            border-radius: 8px;
            box-shadow: 0 0 0 2px var(--slate-500);
        }
    }
}

html.dark {
  .modal-mask {
    background-color: rgba(48, 47, 47, 0.7);
    @supports not (backdrop-filter: blur(7px)) {
        background-color: rgba(34, 34, 34, 0.897);
    }
    .modal-wrapper {
      .modal-container {
        box-shadow: 0 0 0 2px black;
      }
    }
  }
}
</style>
