<script setup lang="ts">
const imageSlot = ref()
onClickOutside(imageSlot, () => console.log('Hello, World!'))
</script>
<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <button class="modal-close-button-top" @click="$emit('close')">
        <span style="font-size:12px;margin-right: 1em">Press <strong>c</strong> to close</span>
      </button>
      <div class="modal-container">
        <slot ref="imageSlot" class="slotted" />
      </div>
      <button class="modal-close-button-bottom" @click="$emit('close')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="36"
          height="36"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        ><line x1="14" y1="10" x2="21" y2="3" /><polyline points="20 10 14 10 14 4" /><line x1="3" y1="21" x2="10" y2="14" /><polyline points="4 14 10 14 10 20" /></svg>
      </button>
      <slot name="caption" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>

.modal-mask {
  position: fixed;
  z-index: 9000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(7px);
  display: grid;
  place-content: center;

  @supports not (backdrop-filter: blur(7px)) {
    background-color: var(--slate-50);
  }
}

.modal-wrapper {
  display: grid;
  place-content: center;
  height: 100%;
  width: 100%;
}

.modal-container {
    position: relative;
    width: auto;
    height: auto;
    overflow: hidden;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-close-button-top {
  display: none;
  align-items: center;
  background: none;
  border: none;
  position: absolute;
  top: 5px;
  right: 5px;
  color: var(--slate-600);
  svg {
    height: 18px;
    width: 18px;
  }
  @media (min-width: 1024px) {
    display: flex;
  }
}
.modal-close-button-bottom {
  background: none;
  border: none;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: var(--slate-600);
  border: 1px solid var(--slate-600);
  border-radius: 100%;
  display: grid;
  place-content: center;
  padding: 10px;
  transition: color border 180ms ease-in;
  -webkit-tap-highlight-color: transparent;
  svg {
    height: 24px;
    width: 24px;
  }
  &:hover {
    color: var(--green);
    border-color: var(--green);
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

html.dark {
  .modal-close-button {
    color: white;
  }
  .modal-close-button-bottom {
    color: white;
    border-color: white;
    &:hover {
      color: var(--green);
      border-color: var(--green);
    }
  }

  .modal-mask {
    background-color: rgba(0, 0, 0, 0.534);
  }
}
</style>
