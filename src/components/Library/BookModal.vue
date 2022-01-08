<script setup lang="ts">
defineEmits(['close'])
</script>
<template>
  <div class="modal-mask">
    <div
      class="modal-wrapper"
    >
      <div
        class="modal-container"
      >
        <button class="modal-close-button" @click="$emit('close')">
          <XIcon />
        </button>
        <slot class="slotted" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

::v-deep(.modal-container) {
  img {
    object-fit: contain;
    aspect-ratio: 1/1;
    max-height: 300px;
    @media (max-width: 425px) {
      max-height: 200px;
      margin-top: 3rem;
    }
  }
  p {
    font-weight: 500;
    font-size: clamp(100%, 11px + 2vw, 16px);
    font-style: italic;
  }
  .modal-author {
    color: var(--green);
    font-weight: 400;
  }
  .modal-meta {
    padding: 10px;
    @media (min-width: 426px) {
      padding: 2rem;
    }
  }
  p.modal-desc {
    font-family: 'Noto Serif';
    @media (max-width: 425px) {
      font-size: 13px;
      margin: 0;
    }
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  /* background-color: var(--slate-100); */
  display: table;

  @supports not (backdrop-filter: blur(7px)) {
    background-color: var(--slate-50);
  }
}

.modal-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  max-width: 1000px;
  @media (max-width: 425px) {
    align-items: flex-start;
  }
}

.modal-container {
  margin: 0 auto;
  padding: 1.5rem clamp(1rem, 5%, 3rem);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-image {
    img {
        max-width: 100px;
    }
}

.modal-close-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  position: absolute;
  top: 5px;
  right: 0;
  /* @media (max-width: 425px) {
    display: none;
  } */
  svg {
    height: 18px;
    width: 18px;
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

  .modal-mask {
    background-color: rgba(0, 0, 0, 0.534);
    @supports not (backdrop-filter: blur(7px)) {
      background-color: #161618;
      color: white;
    }
  }
}
</style>
